const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');

const verificarAutenticacao = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split('Bearer ')[1];

        if (!token) {
            return res.status(401).json({ error: 'Token não fornecido' });
        }

        const decodedToken = await admin.auth().verifyIdToken(token);
        req.userId = decodedToken.uid;
        req.userEmail = decodedToken.email;

        next();
    } catch (error) {
        console.error('Erro na autenticação:', error);
        res.status(401).json({ error: 'Token inválido' });
    }
};

router.get('/funcionario', verificarAutenticacao, async (req, res) => {
    try {
        const { userId } = req;

        const [
            nome,
            valor_hora,
            hora_trabalhada,
            status,
            funcao,
            especialidade,
            obra,
        ] = await Promise.all([
            nome.find({ funcionarioId: userId, ativo: true }),
            valor_hora.find({ require: true }).limit(10),
            hora_trabalhada.find({ funcionarioId: userId }),
            status.find({ funcionarioId: userId }),
            funcao.find({ funcionarioId: userId }),
            especialidade.find({ funcionarioId: userId }),
            obra.find({ funcionarioId: userId }),
        ]);

        res.json({
            success: true,
            data: {
                nome,
                valor_hora,
                hora_trabalhada,
                status,
                funcao,
                especialidade,
                obra,
            },
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error('Erro no dashboard:', error);
        res.status(500).json({
            success: false,
            error: 'Erro ao carregar dashboard',
            message: error.message
        });
    }
});

module.exports = router;