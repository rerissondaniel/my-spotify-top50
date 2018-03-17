var fs = require("fs");
var content = fs.readFileSync("top50.json");

var asJson = JSON.parse(content);

asJson = asJson.items;

asJson = asJson.map(o => {
	o.img = o.images[0].url;
	o.url = o.external_urls;
	delete o.external_urls;
	delete o.followers;
	delete o.images;
	delete o.followers;
	return o;
});

var nodes = asJson;
var edges = [];

nodes.forEach(node => {
	sameGenre = nodes.filter(n => {
		var result;
		n.genres.forEach(genre => {
			result = node.genres.indexOf(genre);
		});

		if(result === -1)return false;
		n.genre = node.genres[result];

		return true;
	});
	sameGenre.forEach(n => {
		edges.push({
			source: node.id,
			target: n.id,
			type: n.genre
		});
	})
});


var graph = {
	nodes: nodes,
	edges : edges
};

console.log(JSON.stringify(graph));