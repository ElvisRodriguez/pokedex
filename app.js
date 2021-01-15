const fs = require('fs')
const request = require('request')

const download = (url, path, callback) => {
  request.head(url, (err, res, body) => {
    request(url)
      .pipe(fs.createWriteStream(path))
      .on('close', callback)
  })
}

const buildProjectPokemonUrl = (baseUrl, spriteType, pokemonName) => {
	let projectPokemonUrl = `${baseUrl}/${spriteType}/${pokemonName}.gif`;
	return projectPokemonUrl;
}

const buildFilePath = (basePath, filename, extension) => {
	let filePath = `${basePath}/${filename}.${extension}`;
	return filePath;
}

const downloadPokemonImage = (pokemonName, spriteType, extension) => {
	const baseUrl = 'https://projectpokemon.org/images/';
	const basePath = './images';
	let url = buildProjectPokemonUrl(baseUrl, spriteType, pokemonName);
	let filePath = buildFilePath(basePath, pokemonName, extension);
	download(url, filePath, () => console.log(`Saved ${pokemonName} in ${filePath}`));
}

downloadPokemonImage('charmander', 'normal-sprite', 'gif');
