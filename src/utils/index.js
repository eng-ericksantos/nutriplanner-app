// Esta função cria URLs amigáveis para as páginas da aplicação.
// Por exemplo, createPageUrl("Dashboard") retorna "/dashboard".
export const createPageUrl = (pageName) => {
    return `/${pageName.toLowerCase()}`;
};