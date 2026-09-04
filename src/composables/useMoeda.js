export function useMoeda() {
  function paraBrl(valor) {
    return Number(valor).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    })
  }

  return {
    paraBrl,
  }
}
