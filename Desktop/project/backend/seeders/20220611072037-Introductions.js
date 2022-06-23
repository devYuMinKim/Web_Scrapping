"use strict";

module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add seed commands here.
         *
         * Example:
         * await queryInterface.bulkInsert('People', [{
         *   name: 'John Doe',
         *   isBetaMember: false
         * }], {});
         */

        await queryInterface.bulkInsert(
            "introductions",
            [
                {
                    introduction:
                        "백엔드 개발자를 희망하는 이동호입니다.\nJava, JS를 주로 공부하고 있으며 현재는 express, DB에 관심을 가지고 공부하고 있습니다.\n사람들의 생활에 직접적으로 사용되는 서비스를 만들고 싶습니다.",
                    name: "이동호",
                },
                {
                    introduction:
                        "아직 프론트 백엔드 어디 쪽으로 나아갈지를 정하지 않았지만, 이것 저것 해보면서 찾아가는 중입니다.\n현재 NodeJs , React, Java를 공부하고 있고, 이번 2학년 여름방학에 flutter를 이용해 간단한 앱을 만들면서 모바일 쪽도 공부하려고 합니다.",
                    name: "진병언",
                },
                {
                    introduction:
                        "프론트엔드 개발자를 희망하는 하예진입니다. React, React Native를 주로 사용합니다.\n이외에도 NodeJS와 파이썬을 틈틈히 공부하고 있으며, Adobe Illustrator, Adobe Photoshop을 사용해 창작하는 것을 즐깁니다.\n훌륭한 개발자가 되기 위해 항상 노력하겠습니다.",
                    name: "하예진",
                },
                {
                    introduction:
                        "영진전문대학교 일본취업반에서 프론트엔드를 공부하고 있는 김유민입니다.\n알고리즘 풀이, 일본 드라마 시청이 취미이며, 현재 React, NodeJS를 공부하고 있습니다.\n대체불가능한 프론트엔드 개발자가 되는 것이 목표입니다.",
                    name: "김유민",
                },
                {
                    introduction:
                        "영진전문대학 컴퓨터정보계열 2학년 구성균이라고 합니다.\n어릴 적 부터 일본어에도 관심이 있고 컴퓨터도 많이 해서 일본취업반에 들어오게 되었습니다.\n현재는 일본취업을 목표로 일본어와 웹프로그래밍을 전공하고 있습니다.\n열심히 하겠습니다.",
                    name: "구성균",
                },
            ],
            {}
        );
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("introductions", null, {});
    },
};
