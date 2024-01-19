// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::Manager;

fn main() {
    tauri::Builder::default()
        .setup(|app| {
            // 開発時だけdevtoolsを表示する。
            #[cfg(debug_assertions)]
            app.get_window("main").unwrap().open_devtools();

            // App#manageメソッドでステート変数を管理するように登録できる。
            // let state = "hello".to_owned();
            // app.manage(state);
            Ok(())
        })
        // .invoke_handler(tauri::generate_handler![db_commands::save_diary])
        .plugin(
            tauri_plugin_sql::Builder::default()
                .add_migrations(
                    "sqlite:tsuzulog.db",
                    vec![
                        tauri_plugin_sql::Migration {
                            version: 1,
                            description: "create basic tables",
                            sql: include_str!("./migrations/0001_create_basic_tables.sql"),
                            kind: tauri_plugin_sql::MigrationKind::Up,
                        }
                    ],
                ).build(),
        )
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
