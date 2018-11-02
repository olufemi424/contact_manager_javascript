//listen for form submit

document.getElementById('myForm').addEventListener('submit', saveBookMark);

//save bookmark
function saveBookMark(e){

    //save form values

    var siteName = document.getElementById('siteName').value;
    var siteUrl = document.getElementById('siteUrl').value;

    if(!validateForm(siteName, siteUrl)){
        return false;
    }

    var bookmark = {
        name: siteName,
        url: siteUrl
    }

    /*
    //local storage Test

    localStorage.setItem('test', 'Hello world');
    console.log(localStorage.getItem('test'));
    localStorage.removeItem('test');
    console.log(localStorage.getItem('test','Hello world'));
*/

//test if bookmarks is null
    if(localStorage.getItem('bookmarks') === null){
    //init array
        var bookmarks = [];
    //add array
        bookmarks.push(bookmark);
    //set to localstorage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    } else {
    //get bookmarks from localstorage 
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    //add bookmark to array

        bookmarks.push(bookmark);

    //reset back to localstorage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    }

    //re-fetch bookmarks
    fetchBookmarks();
     
      

    //prevent form from submitting
    e.preventDefault();
}

//delete bookmarks
function deleteBookmark(url){

//get bookmarks from localstorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
//loop thru the bookmarks
    for(var i = 0; i < bookmarks.length; i++){
        if(bookmarks[i].url == url){
        //remove from array
        bookmarks.splice(i,1);
        }
    }
//Re-set back to the list remaining in local storage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));


//re-fetch bookmarks
    fetchBookmarks();

}


//fetch bookmarks
    function fetchBookmarks(){
       var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    //get output id

    var bookmarksResults = document.getElementById('bookmarksResults');

    //build output
    bookmarksResults.innerHTML = '';

    for(var i = 0; i < bookmarks.length; i++){
    var name = bookmarks[i].name;
    var url = bookmarks[i].url;

    bookmarksResults.innerHTML += '<div class="well">' +
                                '<h3>' + name +
                                ' <a class = "btn btn-default" target= "_blank" href= "' + url +'">Visit</a>' +
                                ' <a onclick="deleteBookmark(\''+url+'\')" class = "btn btn-danger" href= "#"' + url +'">Delete</a>' +
                                '</h3>'+
                                '</div>'
    }

//clear form after each attempt of adding a url

document.getElementById('myForm').reset();
       
}



//validate form 

function validateForm(siteName, siteUrl){
    if(!siteName || !siteUrl){
        alert('Please fill in the form');
        return false;
    }

    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);

    if(!siteUrl.match(regex)){
        alert('please use a valid URl');
        return false;
    }

    return true;
}

//clear form after each attempt of adding a url

document.getElementById('myForm').reset();