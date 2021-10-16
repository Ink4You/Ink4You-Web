# Convenções do WEB

- Manter o padrão, código em inglês
```jsx
function RegisterTattooArtist() {}
```
- PascalCase em funções 
```jsx
function RegisterTattooArtist();
```
- CamelCase em variáveis 
```jsx
var tattooArtist;
```
- Considerar let e const no lugar do var
```jsx
let tattooArtist;
```
- Aspas simples para strings
```jsx
let tatooArtistName = 'Name';
```
- Aspas duplas para parametros dos componentes e atributos HTML
```jsx
<div className="container">
  <Input text="example" />
</div>
```
- PascalCase na importação dos componentes
```jsx
import Input from '../../Components/Input';
```
- Ponto e virgula no final das linhas
```jsx
return;
``` 
- Exportar os componentes e paginas no final do arquivo
```jsx
export default Button();
```
- Para partes de formulários (Steps) exportar utilizando Named Exports
```jsx
export function ExampleStep() {
  // hidden code
}
```
- Usar as variáveis para as cores 
```jsx
color: var(--white);
```
