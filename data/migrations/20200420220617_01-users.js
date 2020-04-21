
exports.up = function (knex) {
    return knex.schema
        .createTable('users', tbl => {
            tbl.increments();
            tbl.string('username', 15).notNullable().unique();
            tbl.string('password', 15).notNullable();
            tbl.string('department', 20).notNullable();
        });
};

exports.down = function (knex) {
    return knex.schema
        .dropTableIfExists('users')
};