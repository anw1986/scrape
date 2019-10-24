$(document).ready(function () {

    $("#scrape").on("click", function () {
        $.ajax({
            method: "GET",
            url: "/scrape"
        }).then(function (response) {
            console.log(response)
            location.reload();
        })

    })

    // clear the records/documents
    $("#clear").on('click',()=>{
        $.ajax({
            method:'DELETE',
            url:'/api/clear'
        }).then(response=>{
            console.log(response)
            location.reload()
        })
    })

    // send the PUT request
    $(".save").on('click',function(){
        var saveId=$(this).data("val")
        $.ajax({
            method:'PUT',
            url:'/api/save/'+saveId
        }).then((response)=>{
            console.log(response)
            location.reload()
        })
    })

    $(".remove").on('click',function(){
        var removeId=$(this).data("val")
        $.ajax({
            method:'PUT',
            url:'/api/remove/'+removeId
        }).then((response)=>{
            console.log(response)
            location.reload()
        })
    })

    $('.addnote').on('click',function(){
        var articleId=$(this).data('val')
        $("#notesubmit").on('click',function(){
            let note=$("#noteinput").val().trim();
            $.ajax({
                method: "POST",
                url:"/article/note",
                data:{
                    noteText:note,
                    article:articleId
                }
            }).then(function(data){
                console.log(data)
                location.reload()
            })
        })
    })

    $(".note-delete").on('click',function(){
        var commentId=$(this).attr('id')
        $.ajax({
            method:'DELETE',
            url:"/api/comment/"+commentId
        }).then(function(response){
            console.log(response)
            location.reload()
        })
    })

})