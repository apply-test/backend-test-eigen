const { Member, Book, Borrow } = require("../models");
const { sequelize } = require("../models/index");

class MemberCtrl {
  //* ─── Get All Member ──────────────────────────────────────────────────
  static async getAllMember(req, res) {
    try {
      const members = await Member.findAll({
        exclude: ["createdAt", "updatedAt"],
        include: [
          {
            model: Book,
            through: {
              model: Borrow,
              where: {
                returnDate: null,
              },
            },
          },
        ],
      });

      const membersWithBorrowCount = await Promise.all(
        members.map(async (member) => {
          const borrowedCount = await Borrow.count({
            where: { MemberId: member.id, returnDate: null },
          });
          return {
            id: member.id,
            name: member.name,
            code: member.code,
            Books: member.Books.map((e) => {
              return {
                id: e.id,
                title: e.title,
                author: e.author,
              };
            }),
            borrowedCount,
          };
        })
      );

      // console.log(
      //   "🚀 ~ MemberCtrl ~ getAllMember ~ data:",
      //   membersWithBorrowCount
      // );
      res.status(200).json(membersWithBorrowCount);
    } catch (error) {
      console.log("🚀 ~ MemberCtrl ~ getAllMember ~ error:", error);
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  }
}

module.exports = MemberCtrl;
