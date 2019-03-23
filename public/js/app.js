$(function() {
    // ===========Navbar functions===========
    // Scrape
    $('.scrape-btn').click(()=> {
        $.ajax({
            method: "GET",
            url: "/scrape"
        })
        .then(result => {
            window.location.href = '/';
        });
    });

    // Clear
    $('#clearBtn').click(()=> {
        $.ajax({
            method: "GET",
            url: "/clear"
        })
        .then(result => {
            window.location.href = '/';
        })
    })

    // Save Article
    $(document).on('click', '.save', function () {
        // Checks to see if saved attribute is true
        $(this).attr('saved') === "true" ? $(this).attr('saved', "false") : $(this).attr('saved', "true")
        const heart = $(this).children('i.fa-heart');
        heart.toggleClass('fas far');
        const id = $(this).attr('data-id');
        const saved = $(this).attr('saved')
        console.log(`Saved: ${saved}`)
        $.ajax({
            method: "PUT",
            url: "/article/" + id,
            data: { saved: saved }
        })
            .then(data => {
                console.log(data);
            })
            .catch(err => {
                if (err) console.log(err);
            })
    });

    // Saves the note to Notes model
    $('#saveNote').click(() => {
        const id = $('.save-note').attr('data-id');
        const body = $('.note-text').val().trim();
        $.ajax({
            method: "POST",
            url: "/note/" + id,
            data: {
                body: body
            }
        })
            .then(data => {
                location.reload();
            })
            .catch(err => {
                if (err) console.log(err);
            })
    });

    // Clears modal data on dismiss/close
    $('modal').on('hidden.bs.modal', function () {
        $(this).removeData('bs.modal')
    })

    // Displays notes for article on click
    $('.edit-btn').click(function () {
        const id = $(this).attr('data-id');
        $.ajax({
            method: "GET",
            url: "/note/" + id
        })
            .then(data => {
                if (data.note) {
                    const noteDisplay = $(`#noteDisplay`)
                    noteDisplay.empty();
                    data.note.forEach(e => {
                        noteDisplay.append(`<li class='comment' data-id='${e._id}'>${e.body}</li>`)
                    })
                }
                else {
                    console.log('no notes to display')
                }
            })
    });

    // Delete notes
    $(document).on('click', '.comment', function() {
        const id = $(this).attr('data-id');
        $.ajax({
            method: "DELETE",
            url: '/note/' + id
        })
        .then(data => {
            location.reload();
        })
        .catch(err => {
            if (err) console.log(err);
        })
    })

    // delete note
    $(document).on('click', '.delete-note', function () {
        const id = $(this).attr('data-id');
        $.ajax({
            method: "DELETE",
            url: '/delete/note/' + id
        })
            .then(
                location.reload()
            )
    })
})