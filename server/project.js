import pool from './db.js'
export async function projects() {
    try {
        const result = await pool.query(`SELECT * FROM Projects ORDER BY Id`);
        return result.rows
    } catch (error) {
        return JSON.stringify({
            error,
        });
    }
}

export async function project(_, args) {
    try {
        const result = await pool.query(`SELECT * FROM Projects where id=${args.id}`);
        return result.rows[0]
    } catch (error) {
        return JSON.stringify({
            error,
        });
    }

}

export async function addProject(_, args) {
    try {
        console.log('hello world')
        const result = await pool.query(`INSERT INTO Projects (title,link,description,image,skills)
    VALUES ('${args.project.title}', '${args.project.link}', '${args.project.description}','${args.project.image}' , '${args.project.skills}')
    RETURNING *;`);
    console.log('after')
    console.log(result)
        return result.rows[0]
    } catch (error) {
        return JSON.stringify({
            error,
        });
    }

}

export async function deleteProject(_, args) {
    try {
        const result = await pool.query(`DELETE FROM Projects
    WHERE id = ${args.id}
    RETURNING *;`);
        return result.rows
    } catch (error) {
        return JSON.stringify({
            error,
        });
    }

}

export async function updateProject(_, args) {
    try {
        const result = await pool.query(`
    UPDATE Projects
    SET 
    ${Object.entries(args.project).map(project => `
            ${project[0]} = '${project[1]}'
        `)
            }
    WHERE id = '${args.id}'
    RETURNING *;
    `)
        return result.rows[0];
    } catch (error) {
        return JSON.stringify({
            error,
        });
    }

}