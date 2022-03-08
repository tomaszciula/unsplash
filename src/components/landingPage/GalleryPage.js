import axios from "axios";
import React, { useEffect, useState } from "react";
// import Modal from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import ImageModal from '../ImageModal';

// Zastosowałebym w kodzie jakąś libkę do typów (np prop-types) lub typescripta
// Osobiście nienawidze tailwinda, ale to subiektywne zdanie, jestem poprostu ciekaw 
// co spowodowało ten wybór, kosztem chyba bardziej popularnych styled-components,
// czy może po prostu css-modules (najlepiej scss-modules a juz najbardziej najlepiej w metodologi BEM)
// Oczywiście ta uwaga jest mało merytoryczna i wynika jedynie z ciekawości, tailwind 
// z nieznajomych mi powodów jest popularny i lubiany

const GalleryPage = ({ text, setText }) => {
  const [index, setIndex] = useState(-1);
  const [result, setResult] = useState([])

  // Zakomentowałem open, uznając za zbyteczny, tak naprawde gdy masz index to możesz modal otworzyć
  // const [open, setOpen] = useState(false);

  // Zakomentowałem imageURL, bo wydaje mi się nie potrzebny, możesz wyciągnąć go z result[index],
  // tak też zrobiłem w przypadku wywołania komponentu modala
  // const [imageURL, setImageURL] = useState("");
  //const index = result.findIndex((item) => item.urls.regular === imageURL);

  // const onOpenModal = () => setOpen(true);
  // const onCloseModal = () => setOpen(false);

  const handleClick = (e) => {
    // Raczej należy się wystrzegać nazw typu i czy e, raczej powinno się zapisać np clickedIndex i event
    const i = result && result.findIndex((item) => item.urls.regular === e.target.id);
    // setImageURL(e.target.src);
    setIndex(i);
    // onOpenModal();
  };

 

  useEffect(() => {
    // Zastanowiłbym się czy ta akcja by nie bardziej pasowała do komponentu z formularzem,
    // odpalała by się na submit i ponadto sam do tego wybrałbym składnię async/await 
    // (ale to z wygody, stanadrdowa składnia rozwiązywania Promise nie jest błedem)

    const fetchData = () => {
      // endpointy warto trzymać w constach
      axios
        .get(
          `https://api.unsplash.com/search/photos?query=${text}&client_id=OgFp81xnu3Y6nnmdJdHj5UdBvmz2jMP_4o_YvmFz6-o`
        )
        .then((response) => {
          console.log(response);
          setResult(response.data.results);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchData();

    // W tym wypadku pusta tablica tez powinna działać, ale to co dałeś jest sensowne bo z propa text korzystasz
  }, [text]);

  useEffect(() => {
    console.log("useEffect result: ", result);
  }, [result]);

  return (
    <div className="flex flex-wrap mx-auto justify-center">
      {result && result.map((image) => (
        <div key={image.id} className="">
          <img
            key={image.id}
            id={image.urls.regular}
            alt={image.alt_description}
            src={image.urls.small}
            onClick={handleClick}
            className=""
          />
        </div>
      ))}

      {Array.isArray(result) && result.length && (
        <ImageModal
          open={index >= 0}
          onCloseModal={() => setIndex(-1)}
          imageURL={result[index]?.urls.small}
          alt={result[index]?.alt_description}
        />
      )}

      {/* Zakomentowałem twój kod modala, problemem było to, że "result[0].alt_description" zwracało ci undefined
      bo result było wtedy jeszcze pustą tablicą. aby uniknąć takiego problemu nalezy zawsze sprawdzić czy object,
      którego właściwość chcesz pobrać istnieje. Ominąć to mogłeś równierz stosując taki zapis: 
      "result[0]?.alt_description" -  wtym wypadku jeżeli result[0] by nie istaniało to całość będzie undefined;
      Pozwoliłem sobie wydzielić twój kod modala do osobnego componentu "ImageModal" - aby łatwiej było nim zarządzać.
      Component ten wstawiłem w kodzie warunkowo, możesz przekazać tam więcej propsów, jeżeli potrzebujesz. */}

      {/* <div className="w-full h-auto mt-10">
        <Modal open={open} onClose={onCloseModal}>
          <div className="flex justify-between">
            <p>xxx</p>
            <p>{result[0].alt_description}</p>
            {console.log("xxx ", result[index])}
            <p>yyy</p>
          </div>
          <img src={imageURL} alt="test" className="" />
          <div className="flex justify-between">
            <p>zzz</p>
            <p>fff</p>
          </div>
        </Modal>
      </div> */}
    </div>
  );
};

export default GalleryPage;
