

interface viaCepResponse {
  cep: string,
  logradouro: string,
  complemento: string,
  unidade: string,
  bairro: string,
  localidade: string,
  uf: string,
  estado: string,
  regiao: string,
  ibge: string,
  gia: string,
  ddd: string,
  siafi: string
}
interface findCityByCepResponse {
  uf: string,
  city: string
}


export async function findCityByCep(cep: number): Promise<findCityByCepResponse> {

  const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
  const data: viaCepResponse = await response.json()
  const cityUnformated = data.localidade
  const cityFormated = cityUnformated.trim().replace(/\s+/g, " ")

  return {
    uf: data.uf,
    city: cityFormated
  }
}