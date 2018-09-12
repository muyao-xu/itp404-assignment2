let postTemplateString = document.getElementById('post-template').innerHTML;
let renderPost = Handlebars.compile(postTemplateString);

Handlebars.registerHelper('formate-value', function(value) {
  return value.toLocaleString();
});

Handlebars.registerHelper('relative-date', function(date) {
	return moment(date).fromNow();
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
		// console.log(renderedPost);
		$('body').append(renderedPost);
	}, function() {
		$('.loader').hide();
		error_msg = "Oops! Something went wrong!"
		$('body').append(error_msg);
	})

	// promise.then(function(posts) {
	// 	let html = '';
	// 	// console.log(posts.data.children[0]);
	// 	var searchResults = posts.data.children;
	// 	// console.log(searchResults);
	// 	searchResults.forEach(function(post) {
	// 		// console.log(post.data.title);
	// 		html += `<p>title: ${post.data.title}, score: ${post.data.score}, 
	// 				author: ${post.data.author}</p>`;
	// 		// console.log(html);
	// 	});
		
	// 	// html = posts.data.children;
	// 	$('.loader').hide();
	// 	$('#results').html(html);

	// 	// $('#resulsts').html(html);
	// }, function(error) {
	// 	console.log('error', error);
	// });
});