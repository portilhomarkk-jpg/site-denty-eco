# Painel Administrativo - Denty Eco

## 🔐 Acesso ao Painel

**URL:** `/admin`

**Credenciais padrão:**
- Usuário: `admin`
- Senha: `denty2025`

## 📋 Funcionalidades

### Dashboard Admin
- ✅ Visualizar todos os modelos cadastrados
- ✅ Criar novos modelos
- ✅ Editar modelos existentes
- ✅ Excluir modelos
- ✅ Marcar modelo como "Mais Popular"
- ✅ Gerenciar todas as especificações (preço, potência, autonomia, velocidade, bateria)

### Campos dos Modelos
- **Nome:** Nome do modelo
- **Preço:** Preço no formato "R$ 0.000"
- **Potência:** Ex: "1000W"
- **Autonomia:** Ex: "40 km"
- **Velocidade:** Ex: "32 km/h"
- **Tipo Bateria:** Removível ou Fixa
- **URL da Imagem:** Link ou caminho da imagem
- **Descrição:** Breve descrição do modelo
- **Mais Popular:** Checkbox para destacar o modelo

## 💾 Armazenamento

Os dados são salvos no **localStorage** do navegador, portanto:
- ✅ Não requer configuração de banco de dados
- ✅ Dados persistem entre sessões
- ⚠️ Dados são específicos do navegador (limpar cache = perder dados)
- ⚠️ Para produção, recomenda-se integrar com Supabase ou outro banco de dados

## 🔄 Como funciona

1. As alterações feitas no painel admin são salvas no localStorage
2. O site público carrega os modelos do localStorage automaticamente
3. Se não houver dados salvos, carrega os modelos padrão

## 🚀 Próximos Passos (Produção)

Para um ambiente de produção, considere:
1. Integrar com Supabase para armazenamento permanente
2. Implementar autenticação robusta (OAuth, JWT)
3. Upload de imagens para Cloudinary ou S3
4. Sistema de backup automático
5. Logs de auditoria de alterações
