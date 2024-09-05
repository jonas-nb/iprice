import React, { useState } from "react";
import { Container, TextField, Button, Typography, Box } from "@mui/material";

const ContainerPrice = () => {
  // Variáveis de preços usadas no cálculo
  const [precoEntrada, setPrecoEntrada] = useState("");
  const [precoCusto, setPrecoCusto] = useState("");
  const [custoMensagem, setCustoMensagem] = useState("");
  const [resultado, setResultado] = useState(null);

  // Função que calcula o lucro final
  const calculoLucro = () => {
    const taxaIfood = 23;
    const taxaEntrega = 3.2;

    const precoEntradaNum = parseFloat(precoEntrada);
    const precoCustoNum = parseFloat(precoCusto) || 0;

    if (isNaN(precoEntradaNum) || precoEntradaNum <= 0) {
      setResultado(null);
      return;
    }

    const valorDescontoIfood = (precoEntradaNum * taxaIfood) / 100;
    const valorDescontoTaxa = (precoEntradaNum * taxaEntrega) / 100;
    const valorFinal =
      precoEntradaNum - valorDescontoIfood - valorDescontoTaxa - precoCustoNum;

    setResultado({
      valorDescontoIfood: valorDescontoIfood.toFixed(2),
      valorDescontoTaxa: valorDescontoTaxa.toFixed(2),
      precoCusto: precoCusto ? precoCustoNum.toFixed(2) : "Não informado",
      lucroFinal: valorFinal.toFixed(2),
    });
    setCustoMensagem(precoCusto ? "" : "Preço de custo não foi informado");
  };

  return (
    <Container>
      <Box my={4}>
        <Typography variant="h5" gutterBottom>
          Calculadora de Preço de Venda
        </Typography>
        <TextField
          label="Preço de Venda (R$)"
          type="number"
          fullWidth
          margin="normal"
          value={precoEntrada}
          onChange={(e) => setPrecoEntrada(e.target.value)}
        />
        <TextField
          label="Preço de Custo (R$)"
          type="number"
          fullWidth
          margin="normal"
          value={precoCusto}
          onChange={(e) => setPrecoCusto(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={calculoLucro}
          sx={{ mt: 2 }}
        >
          Calcular
        </Button>
        {resultado && (
          <Box mt={2}>
            <Typography variant="body1">
              Desconto do iFood: R$ {resultado.valorDescontoIfood}
            </Typography>
            <Typography variant="body1">
              Desconto da Taxa de Entrega: R$ {resultado.valorDescontoTaxa}
            </Typography>
            <Typography variant="body1">
              Preço de Custo: R$ {resultado.precoCusto}
            </Typography>
            <Typography variant="body1">
              Lucro Final: R$ {resultado.lucroFinal}
            </Typography>
          </Box>
        )}
        {custoMensagem && (
          <Typography variant="body2" color="error" mt={2}>
            {custoMensagem}
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default ContainerPrice;
