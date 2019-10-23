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

    $("#clear").on('click',()=>{
        $.ajax({
            method:'DELETE',
            url:'/api/clear'
        }).then(response=>{
            console.log(response)
            location.reload()
        })
    })

    $(".save").on('click',()=>{
        var saveId=$(this).data("val")
        console.log(saveId)
    })
})