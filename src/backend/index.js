const GET = "GET"
const library = [
  { "author": "Karel Capek", "name": "Matka", "release_year": 2004 },
  { "author": "Bohumil Hrabal", "name": "Obsluhoval jsem anglickeho krale", "release_year": 2007 },
  { "author": "Christiane F", "name": "My deti ze stanice ZOO", "release_year": 2005  },
  { "author": "Ota Pavel", "name": "Smrt krasnych srncu", "release_year": 2007 },
  { "author": "Antoine de Saint-Exupery", "name": "Maly princ", "release_year": 2005 },
  { "author": "Karel Capek", "name": "Bila nemoc", "release_year": 1948 },
  { "author": "Victor Hugo", "name": "Chram Matky Bozi v Parizi", "release_year": 2014 },
  { "author": "Karel Hynek Macha", "name": "Maj", "release_year": 2002 },
  { "author": "Moliere", "name": "Lakomec", "release_year": 2008 },
  { "author": "John Steinbeck", "name": "O mysich a lidech", "release_year": 2004 },
  { "author": "Karel Havlicek Borovsky", "name": "Kral Lavra", "release_year": 2006 },
  { "author": "Jaroslav Vrchlicky", "name": "Noc na Karlstejne", "release_year": 2007 },
  { "author": "Ota Pavel", "name": "Jak jsem potkal ryby", "release_year": 2004 },
  { "author": "Radek John", "name": "Memento", "release_year": 2008 },
  { "author": "Arthur Conan Doyle", "name": "Pes baskervilsky", "release_year": 2009 },
  { "author": "Charles Baudelaire", "name": "Kvety zla", "release_year": 1997 },
  { "author": "Vilem Mrstik", "name": "Marysa", "release_year": 2004 },
  { "author": "Oscar Wilde", "name": "Obraz Doriana Graye", "release_year": 1999 },
  { "author": "Franz Kafka", "name": "Proces", "release_year": 2005 }
]

const search_library = (library, search, fn) => {
  const all_found = []
  for ( const book of library ) {

    const found = fn( search, book )
    if ( found ) {
      all_found.push( found )
    }

  }
  return all_found
}

const build_ret = ( message, code ) => {
  return {
    body: JSON.stringify( message ),
    statusCode: code
  }
}

export const handler = async (event) => {
  if ( event.requestContext.http.method === GET ) {
    return build_ret( library, 200 )
  }
  
  const body = JSON.parse( atob( event.body ) )
  
  if ( body.author && body.name) {

    return build_ret( "You cannot search by author and book name together", 400 )

  } else if ( body.author ) {

    const authors_books = search_library( library, body.author, (search, book) => {
      if ( book.author.toLowerCase().match( search.toLowerCase() ) ) {
        return book
      }
      return null
    })
    return authors_books.length ? build_ret( authors_books, 200 ) : build_ret( authors_books, 404 )

  } else if ( body.name ) {

    const books = search_library( library, body.name, (search, book) => {
      if ( book.name.toLowerCase().match( search.toLowerCase() ) ) {
        return book
      }
      return null
    })
    return books.length ? build_ret( books, 200 ) : build_ret( books, 404 )
  }
  
  return build_ret( library, 200 )
}

