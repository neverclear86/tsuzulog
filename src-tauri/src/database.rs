use std::path::Path;
use rusqlite::Connection;
use refinery::embed_migrations;
embed_migrations!("src/migrations");

// fn setup_database<P: AsRef<Path>>(db_file: P) -> Connection {
//     let mut conn = Connection::open(db_file)?;
//     migrations::runner().run(&mut conn).unwrap();
//     return conn
// }
