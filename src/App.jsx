import { useState } from "react";
import { Accordion, AccordionTab } from "primereact/accordion";
import data from "./products.json";
import "./App.scss";

function App() {
  // Estado para controlar qué imágenes están visibles
  const [visibleImages, setVisibleImages] = useState({});
  // Estado para los alérgenos seleccionados por cada producto (independientes)
  const [selectedAlergens, setSelectedAlergens] = useState({});

  // Agrupar productos por categoría
  const groupByCategory = (category) => {
    return data.products.filter((product) => product.CAT === category);
  };

  // Función para manejar el clic en el nombre del producto y alternar visibilidad de la imagen
  const toggleImageVisibility = (index) => {
    setVisibleImages((prevState) => ({
      ...prevState,
      [index]: !prevState[index], // Alterna el estado de visibilidad
    }));
  };

  // Función para manejar la selección de un alérgeno específico para un producto
  const handleAlergenClick = (productIdx, alergenId) => {
    const alergen = data.alergenos.find((a) => a.id === alergenId);

    if (alergen && alergen.name === Object.values(selectedAlergens)[0]) {
      setSelectedAlergens("");
    } else {
      // Actualizar el estado para el producto específico
      setSelectedAlergens((prevState) => ({
        ...prevState,
        [productIdx]: alergen ? alergen.name : null, // Actualiza solo el producto clicado
      }));
    }
  };

  // Filtrar las categorías que tienen productos
  const filteredCategories = data.categories.filter(
    (category) => groupByCategory(category).length > 0
  );

  return (
    <div className="container">
      {/* <GoogleTranslate/> */}
      <div className="header">
        <img src={`./pic/logo.png`} style={{ width: "100px" }} alt="logo" />
      </div>
      <div className="company-info">
        <span>{data.company?.name}</span>
        <br />
        <span>
          {data.company?.address} - {data.company?.city} - ({data.company?.province})
        </span>
        <br />
        <span>{data.company?.phone}</span>
      </div>
      <div style={{ width: "100%" }} className="container-accordion">
        <Accordion>
          {filteredCategories.map((category, index) => (
            <AccordionTab key={index} header={category.toUpperCase()}>
              {groupByCategory(category).map((product, idx) => (
                <div key={idx} style={{ marginBottom: "10px" }}>
                  {/* Título del producto con el evento onClick */}
                  <hr />
                  <h4
                    style={{ cursor: "pointer", color: "black" }}
                    onClick={() => toggleImageVisibility(idx)}
                  >
                    {product.NAME.es} - {product.PRICE}€
                  </h4>

                  {/* Mostrar/ocultar la imagen dependiendo del estado */}
                  <img
                    className="img-prod"
                    src={`./pic/${product.PIC}`}
                    alt={product.NAME.es}
                    style={{
                      width: "200px",
                      height: "auto",
                      cursor: "pointer",
                    }}
                    onClick={() => toggleImageVisibility(idx)} // Permite ocultar la imagen al hacer clic
                  />

                  {/* Mostrar los alérgenos como imágenes y el nombre del alérgeno al hacer clic */}
                  <p>
                    {product.ALERG.map((alergenId) => (
                      <img
                        key={alergenId}
                        src={`./alerg/${alergenId}.png`}
                        alt={`Alergeno ${alergenId}`}
                        style={{
                          width: "30px",
                          padding: "1%",
                          height: "auto",
                          cursor: "pointer",
                        }}
                        onClick={() => handleAlergenClick(idx, alergenId)} // Pasamos el índice del producto
                      />
                    ))}
                  </p>

                  {/* Mostrar el nombre del alérgeno seleccionado solo para este producto */}
                  {selectedAlergens[idx] && (
                    <div>
                      <p style={{ color: "black" }}>
                        {selectedAlergens[idx]}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </AccordionTab>
          ))}
        </Accordion>
      </div>
    </div>
  );
}

export default App;
