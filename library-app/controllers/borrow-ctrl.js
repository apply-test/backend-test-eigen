const { Op } = require("sequelize");
const { Borrow, Member, Book } = require("../models");

class BorrowCtrl {
  //* ─── To Borrow by code ───────────────────────────────────────────────────────
  static async toBorrow(req, res) {
    try {
      const { memberCode, bookCode } = req.body;

      // ─── Find Member ──────────────────────────────────────────────────────────
      const member = await Member.findOne({ where: { code: memberCode } });
      if (!member) {
        return res.status(404).json({ message: "Member not found" });
      }

      // ─── Validation Borrows 2 Books ───────────────────────────────────────────
      const borrowCount = await Borrow.count({
        where: { MemberId: member.id, returnDate: null },
      });
      if (borrowCount >= 2) {
        return res.status(400).json({ message: "You can borrow only 2 books" });
      }

      // ─── Validation Penalty ───────────────────────────────────────────────────
      const now = new Date();
      const penalty = await Borrow.findOne({
        where: { MemberId: member.id, penaltyEnd: { [Op.gt]: now } },
      });
      if (penalty) {
        return res.status(400).json({ message: "Member has a penalty" });
      }

      // ─── Find Book ────────────────────────────────────────────────────────────
      const book = await Book.findOne({ where: { code: bookCode } });
      if (!book) {
        return res.status(404).json({ message: "Book not found" });
      }

      // ─── Check if Book is Already Borrowed ────────────────────────────────────
      const isBookBorrowed = await Borrow.findOne({
        where: { BookId: book.id, returnDate: null },
      });
      if (isBookBorrowed && book.stock <= 0) {
        return res.status(400).json({ message: "Book is already borrowed" });
      }

      // ─── Check if Book is Already Borrowed by Member ──────────────────────────────
      const alreadyBorrowed = await Borrow.findOne({
        where: { MemberId: member.id, BookId: book.id, returnDate: null },
      });
      if (alreadyBorrowed) {
        return res
          .status(400)
          .json({ message: "Member already borrowed this book" });
      }

      // ─── Update Book Stock ────────────────────────────────────────────────────
      if (book.stock < 1) {
        return res
          .status(400)
          .json({ message: "No stock available for the book" });
      }

      await book.update({ stock: book.stock - 1 });

      // ─── Create Borrow Record ─────────────────────────────────────────────────
      await Borrow.create({
        MemberId: member.id,
        BookId: book.id,
      });

      // ─── Deleting The Oldest Borrow Record ───────────────────────────────────
      const amountBorrowed = await Borrow.count({
        where: { MemberId: member.id },
      });
      if (amountBorrowed > 2) {
        const oldestBorrow = await Borrow.findOne({
          where: { MemberId: member.id },
          order: [["createdAt", "ASC"]],
        });

        if (oldestBorrow) {
          await oldestBorrow.destroy();
        }
      }

      res.status(200).json({ message: "Book borrowed successfully" });
    } catch (error) {
      console.error("🚀 ~ BorrowCtrl ~ toBorrow ~ error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  //* ─── To Return Book ──────────────────────────────────────────────────
  static async toReturn(req, res) {
    try {
      const { bookCode, memberCode } = req.body;

      // ─── Find Member ───────────────────────────────────────────────────────
      const member = await Member.findOne({ where: { code: memberCode } });
      if (!member) {
        return res.status(404).json({ message: "Member not found" });
      }

      // ─── Find Book ─────────────────────────────────────────────────────────
      const book = await Book.findOne({ where: { code: bookCode } });
      if (!book) {
        return res.status(404).json({ message: "Book not found" });
      }

      // ─── Find Borrow Record ───────────────────────────────────────────────
      const borrow = await Borrow.findOne({
        where: { MemberId: member.id, BookId: book.id, returnDate: null },
      });

      if (!borrow) {
        return res
          .status(400)
          .json({ message: "Book not borrowed by the member" });
      }

      // ─── Calculate Penalty ────────────────────────────────────────────────
      const borrowedDate = new Date(borrow.createdAt);
      const currentDate = new Date();
      const diffTime = Math.abs(currentDate - borrowedDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays > 7) {
        const penaltyEnd = new Date();
        penaltyEnd.setDate(penaltyEnd.getDate() + 3);

        await borrow.update({ penaltyEnd });
      }

      // ─── Update Book Stock ────────────────────────────────────────────────
      await book.update({ stock: book.stock + 1 });

      // ─── Update Borrow Record ─────────────────────────────────────────────
      await borrow.update({ returnDate: currentDate });

      res.status(200).json({ message: "Book returned successfully" });
    } catch (error) {
      console.error("🚀 ~ BorrowCtrl ~ toReturn ~ error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

module.exports = BorrowCtrl;
