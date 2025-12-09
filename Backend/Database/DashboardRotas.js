const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');

// Middleware para verificar autenticação
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

// Dashboard do Engenheiro
router.get('/engenheiro', verificarAutenticacao, async (req, res) => {
  try {
    const {userId} = req;
    
    // Buscar todas as informações do engenheiro de uma vez
    const [
      obras,
      produtos,
      maoObra,
      maquinarios,
      materialUtilizado
    ] = await Promise.all([
      // Obras do engenheiro
      obras.find({ engenheiroId: userId }),
      
      // Produtos cadastrados
      produtos.find({ ativo: true }).limit(10),
      
      // Mão de obra
      maoObra.find({ engenheiroId: userId, ativo: true }),
      
      // Maquinário
      maquinarios.find({ engenheiroId: userId }),
      
      // Material utilizado recentemente
      materialUtilizado.find({ engenheiroId: userId })
        .sort({ data: -1 })
        .limit(10)
    ]);

    res.json({
      success: true,
      data: {
        obras,
        produtos,
        maoObra,
        maquinarios,
        materialUtilizado,
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