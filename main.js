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
		let html = '';
		// console.log(posts.data.children[0]);
		var searchResults = posts.data.children;
		// console.log(searchResults);
		searchResults.forEach(function(post) {
			// console.log(post.data.title);
			html += `<p>title: ${post.data.title}, score: ${post.data.score}, 
					author: ${post.data.author}</p>`;
			// console.log(html);
		});
		
		// html = posts.data.children;
		$('.loader').hide();
		$('#results').html(html);

		// $('#resulsts').html(html);
	}, function(error) {
		console.log('error', error);
	});
});