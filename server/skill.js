import pool from './db.js'

export async function skills() {
    try {
        const result = await pool.query(`SELECT * FROM Skills ORDER BY Id`);
        return result.rows
    } catch (error) {
        return JSON.stringify({
            error,
        });
    }
}

export async function skill(_, args) {
    try {
        const result = await pool.query(`SELECT * FROM Skills where id=${args.id}`);
        return result.rows[0]
    } catch (error) {
        return JSON.stringify({
            error,
        });
    }

}

export async function addSkill(_, args) {
    try {
       const result = await pool.query(`INSERT INTO Skills (title,image,percentage)
    VALUES ('${args.skill.title}', '${args.skill.image}', '${args.skill.percentage}')
    RETURNING *;`);
    return result.rows[0] 
    } catch (error) {
        return JSON.stringify({
            error,
        });
    }
    
}

export async function deleteSkill(_, args) {
    try {
      const result = await pool.query(`DELETE FROM Skills
    WHERE id = ${args.id}
    RETURNING *;`);
    return result.rows  
    } catch (error) {
        return JSON.stringify({
            error,
        }); 
    }
    
}

export async function updateSkill(_, args) {
    try {
      const result = await pool.query(`
    UPDATE Skills
    SET 
    ${
        Object.entries(args.skill).map(skill=>`
            ${skill[0]} = '${skill[1]}'
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