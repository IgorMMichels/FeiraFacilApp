<script setup>
import { pedidos } from '@/data/pedidos'
import { useMoeda } from '@/composables/useMoeda'
import { computed, ref } from 'vue'

const filtro = ref('')
const busca = ref('')
const { paraBrl } = useMoeda()

const quantidadeItens = computed(() => {
  let total = 0

  for (const pedido of pedidos.value) {
    for (const item of pedido.itens) {
      total += Number(item.quantidade)
    }
  }

  return total
})

const totalVendido = computed(() => {
  let total = 0

  for (const pedido of pedidos.value) {
    for (const item of pedido.itens) {
      total += Number(item.precoUnitario) * Number(item.quantidade)
    }
  }

  return total
})

const pedidosFiltrados = computed(() => {
  const termo = busca.value.trim().toLowerCase()

  if (!termo) return pedidos.value

  return pedidos.value.filter(
    (pedido) =>
      pedido.codigo.toLowerCase().includes(termo) || pedido.cliente.toLowerCase().includes(termo),
  )
})

function filtrarPedidos() {
  busca.value = filtro.value
}

function quantidadeDoPedido(pedido) {
  let total = 0

  for (const item of pedido.itens) {
    total += Number(item.quantidade)
  }

  return total
}

function totalDoPedido(pedido) {
  let total = 0

  for (const item of pedido.itens) {
    total += Number(item.precoUnitario) * Number(item.quantidade)
  }

  return total
}
</script>

<template>
  <main class="container page">
    <header class="page-header">
      <h1>Resumo dos pedidos</h1>
      <p>Consulte os pedidos finalizados e o total vendido.</p>
    </header>

    <section class="summary-grid" aria-label="Resumo geral das vendas">
      <article class="summary-card">
        <span>Pedidos realizados</span>
        <strong>{{ pedidos.length }}</strong>
      </article>

      <article class="summary-card">
        <span>Itens vendidos</span>
        <strong>{{ quantidadeItens }}</strong>
      </article>

      <article class="summary-card">
        <span>Total vendido</span>
        <strong>{{ paraBrl(totalVendido) }}</strong>
      </article>
    </section>

    <section class="card" aria-labelledby="filtro-pedidos">
      <h2 id="filtro-pedidos">Filtrar pedidos</h2>

      <div class="filter-container">
        <div class="form-group">
          <label for="filtro"> Nome do cliente ou código do pedido </label>

          <input
            id="filtro"
            name="filtro"
            type="search"
            placeholder="Digite o cliente ou código"
            v-model="filtro"
          />
        </div>

        <button class="button button-primary" type="button" @click="filtrarPedidos">Filtrar</button>
      </div>
    </section>

    <section class="card" aria-labelledby="pedidos-realizados">
      <h2 id="pedidos-realizados">Pedidos realizados</h2>
      <p v-if="pedidosFiltrados.length === 0">Nenhum pedido encontrado.</p>
      <div class="table-responsive">
        <table>
          <thead>
            <tr>
              <th scope="col">Código</th>
              <th scope="col">Cliente</th>
              <th scope="col">Produtos</th>
              <th scope="col">Itens</th>
              <th scope="col">Total</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="pedido in pedidosFiltrados" :key="pedido.codigo">
              <td>{{ pedido.codigo }}</td>
              <td>{{ pedido.cliente }}</td>
              <td>{{ pedido.itens.length }}</td>
              <td>{{ quantidadeDoPedido(pedido) }}</td>
              <td>{{ paraBrl(totalDoPedido(pedido)) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </main>
</template>
