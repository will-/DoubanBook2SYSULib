/* ***  This chrome extensions is created by  irachex (Huayi Zhang) <irachex@gmail.com> firstly which works in Fudan Uni
*-versity Library . I have made it work for GDUFS Library and got the author's permission to modify it .  
* If you find any bugs ,you can fix it yourself  & it is recommended to inform me of that .  Enjoy it :)
* David Chen  <chendahui007@gmail.com>    10 Jun,2012 
*/

// change this to make it suitable for your school Library
var base_search_url = "http://opac.gdufs.edu.cn:8991/F/?func=find-b&find_base=GWD01&find_code=WRD&request={{data}}";

function getLibraryButton(keyword) {
    var search_url = base_search_url.replace("{{data}}", keyword);
    var borrowButton = $('<a href="'+search_url+'" style="float:left;display: inline-block;background: #33A057;border: 1px solid #2F7B4B;color: white;padding: 1px 10px;border-radius:3px;margin-right: 8px;" target="_blank">借阅</a>');
    return borrowButton;
}

var url = window.location.toString();

// Book Page
if ( url.indexOf('subject')!=-1 ){
    var keyword;
    if ($("#info span:last").html().indexOf("ISBN")!=-1) {
        keyword = $("#info").contents().slice(-2,-1)[0].nodeValue.trim();
    }
    else {
        keyword = $("#mainpic img").attr("alt");
    }
    $('div.a_stars').before(getLibraryButton(keyword));
}

// People's Book List Page
else if( (url.indexOf('mine')!=-1)||(url.indexOf('people')!=-1) ){
    $('div.item ul').each(function(){
        var keyword = $('li.title a em', this).html();
        $('div.opt-r', this).after(getLibraryButton(keyword).css("float","right"));      
    });
}

// System's Book List Page : doulist
else if( url.indexOf('doulist')!=-1 ){
    $('div.article table').each(function(){
        var keyword = $('div.pl2 a', this).html();
        $('td > span.rr', this).prepend(getLibraryButton(keyword));
    });
}

// System's Book List Page : tag  
// obiviously there is a bug in the following code but I don't know how to fixed it now .Maybe you can do that.
else if( url.indexOf('tag')!=-1 ){
    $('div.article table').each(function(){
        var keyword = $('div.pl2 a', this).html();        
        $('td p span.rr', this).prepend(getLibraryButton(keyword));
    });
}
