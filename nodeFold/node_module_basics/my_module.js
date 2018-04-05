module.exports = function() {
    return{

        greet: function (){
            console.log("we are now using a module!");
        },
        add: function (num1, num2){
            console.log('the sume is:', num1 + num2);
        }
    }
}