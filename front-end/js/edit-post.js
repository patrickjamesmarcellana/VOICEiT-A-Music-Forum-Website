//eventlistener for clicking the edit button (redirects to edit-post.html)
$(".edit-post-button").click(function(e) {
    window.location.href = "edit-post.html?post=" + e.currentTarget.closest(".post-container").getAttribute("post-id");
})

function removeHTMLTags(str) {
    if ((str===null) || (str===''))
        return false;
    else
        str = str.toString();

    return str.replace(/(<([^>]+)>)/ig, '');
}

$(document).ready(async function() {

    const search_params = new URLSearchParams(window.location.search)
    const post = await postManager.getPost(search_params.get("post"))
    $("#subforum").val(post.subforum)
    $("#post-title").val(post.title)
    $("#post-content").val(post.text)
    $("#post-id").val(post.post_id)

    $('#post-title').keyup(function() {
        let content_count = removeHTMLTags($('#post-content').val()).length
        let title_count = $('#post-title').val().length
        // console.log(title_count)
        // console.log(content_count)
        if(title_count > 0 && content_count > 0) {
            $('#post-button').attr('disabled', false);            
            $("#post-button").removeClass('noHover')
        } else {
            $('#post-button').attr('disabled', true);
            $("#post-button").addClass('noHover');
        }
    });

});

$(this).keyup(function() { // this points to the rich text editor... I think, or probably the whole document (no prob with that)
    let content_count = removeHTMLTags($('#post-content').val()).length
    let title_count = $('#post-title').val().length
    // console.log(title_count)
    // console.log(content_count)
    if(title_count > 0 && content_count > 0) {
        $('#post-button').attr('disabled', false);    
        $("#post-button").removeClass('noHover')        
    } else {
        $('#post-button').attr('disabled', true);
        $("#post-button").addClass('noHover');
    }
});

$('#post-content').richText({
    // text formatting
    bold: true,
    italic: true,
    underline: true,

    // text alignment
    leftAlign: true,
    centerAlign: true,
    rightAlign: true,
    justify: true,

    // lists
    ol: true,
    ul: true,

    // title
    heading: false,

    // fonts
    fonts: true,
    fontList: [
        "Arial", 
        "Comic Sans MS", 
        "Courier New",  
        "Gugi",
        "Helvetica", 
        "Noir-Light",
        "Noir-Bold",
        "Tahoma", 
        "Times New Roman",
        "Verdana"
    ],
    fontColor: true,
    backgroundColor: false,
    fontSize: true,

    // uploads
    imageUpload: false,
    fileUpload: false,

    // media
    videoEmbed: false,

    // link
    urls: true,

    // tables
    table: false,

    // code
    removeStyles: false,
    code: false,

    // colors
    colors: [],

    // dropdowns
    fileHTML: '',
    imageHTML: '',

    // translations
    translations: {
        'title': 'Title',
        'white': 'White',
        'black': 'Black',
        'brown': 'Brown',
        'beige': 'Beige',
        'darkBlue': 'Dark Blue',
        'blue': 'Blue',
        'lightBlue': 'Light Blue',
        'darkRed': 'Dark Red',
        'red': 'Red',
        'darkGreen': 'Dark Green',
        'green': 'Green',
        'purple': 'Purple',
        'darkTurquois': 'Dark Turquois',
        'turquois': 'Turquois',
        'darkOrange': 'Dark Orange',
        'orange': 'Orange',
        'yellow': 'Yellow',
        'imageURL': 'Image URL',
        'fileURL': 'File URL',
        'linkText': 'Link text',
        'url': 'URL',
        'size': 'Size',
        'responsive': 'Responsive',
        'text': 'Text',
        'openIn': 'Open in',
        'sameTab': 'Same tab',
        'newTab': 'New tab',
        'align': 'Align',
        'left': 'Left',
        'justify': 'Justify',
        'center': 'Center',
        'right': 'Right',
        'rows': 'Rows',
        'columns': 'Columns',
        'add': 'Add',
        'pleaseEnterURL': 'Please enter an URL',
        'videoURLnotSupported': 'Video URL not supported',
        'pleaseSelectImage': 'Please select an image',
        'pleaseSelectFile': 'Please select a file',
        'bold': 'Bold',
        'italic': 'Italic',
        'underline': 'Underline',
        'alignLeft': 'Align left',
        'alignCenter': 'Align centered',
        'alignRight': 'Align right',
        'addOrderedList': 'Ordered list',
        'addUnorderedList': 'Unordered list',
        'addHeading': 'Heading/title',
        'addFont': 'Font',
        'addFontColor': 'Font color',
        'addBackgroundColor': 'Background color',
        'addFontSize': 'Font size',
        'addImage': 'Add image',
        'addVideo': 'Add video',
        'addFile': 'Add file',
        'addURL': 'Add URL',
        'addTable': 'Add table',
        'removeStyles': 'Remove styles',
        'code': 'Show HTML code',
        'undo': 'Undo',
        'redo': 'Redo',
        'close': 'Close',
        'save': 'Save'
    },
                
    // privacy
    youtubeCookies: false,
        
    // preview
    preview: false,

    // placeholder
    placeholder: '',
    
    // developer settings
    useSingleQuotes: false,
    height: 0,
    heightPercentage: 50,
    adaptiveHeight: false,
    id: "",
    class: "",
    useParagraph: false,
    maxlength: 0,
    maxlengthIncludeHTML: false,
    callback: undefined,
    useTabForNext: false,
    save: false,
    saveCallback: undefined,
    saveOnBlur: 0, 
    undoRedo: true
});
