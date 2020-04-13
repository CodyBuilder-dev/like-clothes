import express from 'express';
import db from

router.get('/boards', async(req, res) => {
    const board = await db.board.findAll({});

    return res.json(board);
});