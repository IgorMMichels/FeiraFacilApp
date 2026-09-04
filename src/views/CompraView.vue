<script setup>
import { pedidos } from '@/data/pedidos'
import { useMoeda } from '@/composables/useMoeda'
import { ref } from 'vue'

const codigo = ref('')
const nomeCliente = ref('')
const nomeProduto = ref('')
const quantidade = ref('')
const precoUnitario = ref('')
const preco = ref(0)
let item = {}
const itens = ref([])
const { paraBrl } = useMoeda()

function addProduto() {
  item = {
    id: itens.value.length + 1,
    produto: nomeProduto.value,
    precoUnitario: precoUnitario.value,
    quantidade: quantidade.value,
  }
  itens.value.push(item)
  console.log(item)
  preco.value += precoUnitario.value * quantidade.value
}

function addPedido() {
  let novoPedido = {
    codigo: codigo.value,
    cliente: nomeCliente.value,
    itens: itens.value,
  }
  pedidos.value.push(novoPedido)
  console.log(novoPedido.value)
  itens.value = []
}

function removeProduto(id) {
  const index = itens.value.findIndex((produto) => produto.id === id)

  if (index !== -1) {
    preco.value -= itens.value[index].precoUnitario * itens.value[index].quantidade
    itens.value.splice(index, 1)
  }
}
</script>

<template>
  <main class="container page">
    <header class="page-header">
      <h1>Fazer compra</h1>
      <p>Cadastre o cliente e adicione os produtos do pedido.</p>
    </header>

    <form @submit.prevent="addPedido">
      <section class="card" aria-labelledby="dados-pedido">
        <h2 id="dados-pedido">Dados do pedido</h2>

        <div class="form-grid form-grid-two-columns">
          <div class="form-group">
            <label for="codigoPedido"> Código do pedido </label>

            <input
              id="codigoPedido"
              name="codigoPedido"
              type="text"
              placeholder="Ex.: PED-001"
              v-model="codigo"
              required
            />
          </div>

          <div class="form-group">
            <label for="nomeCliente"> Nome do cliente </label>

            <input
              id="nomeCliente"
              name="nomeCliente"
              type="text"
              placeholder="Digite o nome do cliente"
              v-model="nomeCliente"
              required
            />
          </div>
        </div>
      </section>

      <section class="card" aria-labelledby="adicionar-produto">
        <h2 id="adicionar-produto">Adicionar produto</h2>

        <div class="form-grid form-grid-product">
          <div class="form-group">
            <label for="nomeProduto"> Produto </label>

            <input
              id="nomeProduto"
              name="nomeProduto"
              type="text"
              placeholder="Ex.: Tomate"
              v-model="nomeProduto"
              required
            />
          </div>

          <div class="form-group">
            <label for="precoUnitario"> Preço unitário </label>

            <input
              id="precoUnitario"
              name="precoUnitario"
              type="number"
              min="0"
              step="0.01"
              placeholder="0,00"
              v-model="precoUnitario"
              required
            />
          </div>

          <div class="form-group">
            <label for="quantidade"> Quantidade </label>

            <input
              id="quantidade"
              name="quantidade"
              type="number"
              min="1"
              step="1"
              placeholder="0"
              v-model="quantidade"
              required
            />
          </div>
        </div>

        <div class="form-actions">
          <button class="button button-primary" type="button" @click="addProduto">
            Adicionar produto
          </button>
        </div>
      </section>

      <section class="card" aria-labelledby="itens-pedido">
        <h2 id="itens-pedido">Itens do pedido</h2>
        <div class="table-responsive">
          <table v-show="itens.length != 0">
            <thead>
              <tr>
                <th scope="col">Produto</th>
                <th scope="col">Preço unitário</th>
                <th scope="col">Quantidade</th>
                <th scope="col">Total</th>
                <th scope="col">Ação</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="produto in itens" :key="produto.id">
                <td>{{ produto.produto }}</td>
                <td>{{ paraBrl(produto.precoUnitario) }}</td>
                <td>{{ produto.quantidade }}</td>
                <td>{{ paraBrl(produto.precoUnitario * produto.quantidade) }}</td>
                <td>
                  <button type="button" @click="removeProduto(produto.id)">Excluir</button>
                </td>
              </tr>
            </tbody>
          </table>
          <h3 v-show="itens.length == 0">Nenhum Produto Adicionado</h3>
        </div>

        <div class="order-total">
          <span>Total da compra</span>
          <strong>{{ paraBrl(preco) }}</strong>
        </div>

        <div class="form-actions">
          <button class="button button-secondary" type="button">Limpar</button>

          <button class="button button-primary" type="submit">Finalizar pedido</button>
        </div>
      </section>
    </form>
  </main>
</template>

<style scoped>
h3 {
  text-align: center;
  color: green;
  font-size: 1.5rem;
}
</style>
