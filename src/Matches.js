import * as firebase from 'firebase';

const Matches = function () {

    // console.log("test", res)
    //         var usersRef = firebase.database().ref('users/');
    //         usersRef.on('value', function(snapshot) {
    //             console.log('snapshot', snapshot.val());
    //         });
    var usersRef = firebase.database().ref('users/');
    usersRef.on('value', function(snapshot) {
        console.log('snapshot', snapshot.val());

        const users = snapshot.val();
        const names = Object.values(users).map(user=> user.firstName).filter(name => !!name)
        console.log('names', names)
        console.log('no of name', names.length)

        if (names.length % 2 != 0) {
            alert("You must have an even number of names. You currently have " + names.length + " names.");
        } else {

            var arr1 = names.slice(), // copy array
            arr2 = names.slice(); // copy array again

            arr1.sort(function() { return 0.5 - Math.random();}); // shuffle arrays
            arr2.sort(function() { return 0.5 - Math.random();});

            while (arr1.length) {
                var name1 = arr1.pop(), // get the last value of arr1
                    name2 = arr2[0] == name1 ? arr2.pop() : arr2.shift();
                    //        ^^ if the first value is the same as name1, 
                    //           get the last value, otherwise get the first

                console.log(name1 + ' plays ' + name2);
            }
        }


    });
}


export default Matches;