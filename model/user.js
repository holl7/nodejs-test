// class User {
//     constructor(id, name, age) {
//         this.id = id;
//         this.name = name;
//         this.age = age;
//     }
//     setId(id) {
//         this.id = id;
//     }
//     getId() {
//         return this.id;
//     }
//     setName() {
//         this.name = name;
//     }
//     getName() {
//         return this.name;
//     }
//     setAge() {
//         this.age = age;
//     }
//     getAge() {

//     }
//     setSex() {

//     }
//     getSex() {

//     }

//      test() {

//     }
// }


function User() {
    name: number;
    sex: boolean;
    age: String;

    var init = function () {
        console.log('private');
    }
    var test = function () {
        console.log('private test to public');
    }
    this.get = test;
    init();
}

module.exports = User;