let postTemplateString = document.getElementById('post-template').innerHTML;
let renderPost = Handlebars.compile(postTemplateString);

Handlebars.registerHelper('formate-value', function(value) {
  return value.toLocaleString();
});

$('#search-form').on('submit', function(event) {
	event.preventDefault();
	let subreddit = $('#search-form').serializeArray()[0].value;
	$('.loader').show();

	let url = `https://www.reddit.com/r/${subreddit}.json`

	let promise = $.ajax({
		type: 'Get',
		url: url
	});

	promise.then(function(posts) {
		$('.loader').hide();
		console.log(posts.data.children);
		let renderedPost = renderPost({
			posts: posts.data.children
		});
		$('body').append(renderedPost);
	}, function() {
		$('.loader').hide();
		error_msg = "Oops! Something went wrong!"
		$('body').append(error_msg);
	})

});