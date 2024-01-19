// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::Manager;

fn main() {
    let migrations = vec![
        tauri_plugin_sql::Migration {
            version: 1,
            description: "create basic tables",
            sql: include_str!("./migrations/0001_create_basic_tables.sql"),
            kind: tauri_plugin_sql::MigrationKind::Up,
        }
    ];

    match tauri::Builder::default()
        .setup(|app| {
            // 開発時だけdevtoolsを表示する。
            #[cfg(debug_assertions)]
            app.get_window("main").unwrap().open_devtools();
            Ok(())
        })
        .plugin(
            tauri_plugin_sql::Builder::default()
                .add_migrations("sqlite:tsuzulog.db", migrations)
                .build(),
        )
        .run(tauri::generate_context!()) {
        Ok(()) => (),
        Err(e) => panic!("error while running tauri application: {:?}", e)
    }
}
