const { Op, where } = require("sequelize");
const { Book, Member, Borrow } = require("../models");

class BookCtrl {
  //* ─── Get All Book ────────────────────────────────────────────────────
  static async getAll(req, res) {
    try {
      const amount = await Book.count();
      const books = await Book.findAll({
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        include: [
          {
            model: Member,
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
            through: {
              model: Borrow,
              where: {
                returnDate: null,
              },
              attributes: {
                exclude: ["createdAt", "updatedAt"],
              },
            },
          },
        ],
      });

      const booksData = books.map((book) => ({
        id: book.id,
        code: book.code,
        title: book.title,
        author: book.author,
        stock: book.stock,
        borrowers: book.Members.map((member) => ({
          memberId: member.id,
          memberCode: member.code,
          memberName: member.name,
        })),
      }));

      res.status(200).json({ amount, booksData });
    } catch (error) {
      console.log("🚀 ~ BookCtrl ~ getAll ~ error:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  //* ─── Get Available Book ──────────────────────────────────────────────
  static async getAvailable(req, res) {
    try {
      const books = await Book.findAndCountAll({
        where: { stock: { [Op.gt]: 0 } },
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });
      // console.log("🚀 ~ BookCtrl ~ getAvailable ~ books:", books);
      res.status(200).json(books);
    } catch (error) {
      console.log("🚀 ~ BookCtrl ~ getAvailable ~ error:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  //* ─── Get Borrowed Book ───────────────────────────────────────────────
  static async getUnavailable(req, res) {
    try {
      const books = await Book.findAll({
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        where: { stock: { [Op.lte]: 0 } },
        include: [
          {
            model: Member,
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
            through: {
              model: Borrow,
              where: { returnDate: null }, // Hapus attributes: {...} karena where tidak menerima attributes
              attributes: [], // Kosongkan attributes untuk menghindari include yang tidak valid
            },
            // Hilangkan attributes dari through karena tidak perlu
          },
        ],
      });

      const unavailableBooks = books.map((book) => ({
        id: book.id,
        code: book.code,
        title: book.title,
        author: book.author,
        stock: book.stock,
        borrowers: book.Members.map((member) => ({
          memberId: member.id,
          memberCode: member.code,
          memberName: member.name,
        })),
      }));

      res.status(200).json(unavailableBooks);
    } catch (error) {
      console.error("🚀 ~ BookCtrl ~ getUnavailable ~ error:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

module.exports = BookCtrl;
