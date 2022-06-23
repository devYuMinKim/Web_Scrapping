"use strict";

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert(
            "images",
            [
                {
                    imgName: "lee.jpg",
                    imgLocate: "profileImg",
                    // user_id: "lee",
                },
                {
                    imgName: "jin.jpg",
                    imgLocate: "profileImg",
                    // user_id: "jin",
                },
                {
                    imgName: "ha.jpg",
                    imgLocate: "profileImg",
                    // user_id: "yejin",
                },
                {
                    imgName: "gu.jpg",
                    imgLocate: "profileImg",
                    // user_id: "gu",
                },
                {
                    imgName: "kim.jpg",
                    imgLocate: "profileImg",
                    // user_id: "kim",
                },
            ],
            {}
        );
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("images", null, {});
    },
};
