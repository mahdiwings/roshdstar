import axios from "axios";
import React, { useEffect, useState } from "react";

const Products = () => {
  const [product1, setProduct1] = useState({});
  const [product2, setProduct2] = useState({});
  const [product3, setProduct3] = useState({});
  const [product4, setProduct4] = useState({});
  const [product5, setProduct5] = useState({});
  const [token, setToken] = useState("");
  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpen3, setIsOpen3] = useState(false);
  const [isOpen4, setIsOpen4] = useState(false);
  const [isOpen5, setIsOpen5] = useState(false);

  // Banner
  const [isOpenImg1, setIsOpenImg1] = useState(false);
  // Banner State
  const [ImageUrl1, setImageUrl1] = useState({});

  const fetchBanner = async () => {
    try {
      const res = await axios
        .get("https://startmali.runflare.run/api/pages/3")
        .then((res) => {
          setImageUrl1(res.data);
          console.log(res.data);
        });
    } catch (err) {
      console.error("error handling", err);
    }
  };

  const fetchProducts = async () => {
    const apiKey = "k8LknC4kyMbDQ9H6I0uVmTXJgL81Mh";
    try {
      const response = await axios.get(
        "https://startmali.runflare.run/api/products",
        {
          headers: {
            authorization: `${apiKey}`,
            "Content-Type": "application/json",
          },
        }
      );
      setProduct1(response.data[0]);
      setProduct2(response.data[1]);
      setProduct3(response.data[2]);
      setProduct4(response.data[3]);
      setProduct5(response.data[4]);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const jwt = localStorage.getItem("token");
    setToken(jwt);
    fetchProducts();
    fetchBanner();
  }, []);

  // اینا برای drop down هست
  const toggleDropDown1 = () => {
    setIsOpen1(!isOpen1);
  };

  const toggleDropDown2 = () => {
    setIsOpen2(!isOpen2);
  };

  const toggleDropDown3 = () => {
    setIsOpen3(!isOpen3);
  };

  const toggleDropDown4 = () => {
    setIsOpen4(!isOpen4);
  };

  const toggleDropDown5 = () => {
    setIsOpen5(!isOpen5);
  };
  // Banner
  const toggleDropDownImg1 = () => {
    setIsOpenImg1(!isOpenImg1);
  };

  const updateBanners = (banners) => {
    axios
      .patch(
        "https://startmali.runflare.run/api/pages/3",
        { banner: banners },
        {
          headers: {
            authorization: `Bearer ${token}`, // Include the token in the request headers
          },
        }
      )
      .then((response) => {
        alert("بنرها با موفقیت به روزرسانی شدند");
        console.log(response.data, "بنرها با موفقیت به روزرسانی شدند");
      })
      .catch((error) => {
        console.error(error.response.data);
        alert("خطا در به‌روزرسانی بنرها:", error);
      });
  };

  const updateProduct = (product) => {
    const updateData = { ...product };

    //  این برای این هست که فقط اونایی اپدیت بشن که یک مقداری داشته باشن، نمیدونم درسته یا نه
    for (const key in product) {
      if (product[key] !== "") {
        updateData[key] = product[key];
      }
    }

    if (Object.keys(updateData).length === 0) {
      // هیچ فیلدی برای آپدیت وجود ندارد
      alert("هیچ تغییری انجام نشد.");
      return;
    }

    axios
      .patch(
        `https://startmali.runflare.run/api/products/${product.pageNumber}`,
        updateData,
        {
          headers: {
            authorization: `Bearer ${token}`, // Include the token in the request headers
          },
        }
      )
      .then((response) => {
        alert(" محصول با موفقیت به روزرسانی شد");
        console.log(response.data, " محصول با موفقیت به روزرسانی شد");
      })
      .catch((error) => {
        console.error(error.response.data);
        alert("خطا در به‌روزرسانی محصول:", error);
      });
  };

  return (
    <div className="mx-auto lg:mx-0 lg:flex lg:flex-col w-full lg:w-[83vw] h-screen">
      <div className="mt-10 mb-16 mx-4 lg:mx-16">
        <div>
          <h2 className="text-xl font-bold">محصولات</h2>
          <div className="w-20 h-0.5 mt-1 bg-black"></div>
        </div>
        <div className="my-10 bg-slate-50 shadow-xl h-auto w-[100%] lg:w-[90%] p-8 rounded-xl">
          {/* <div className="bg-white mt-0 mb-10 rounded-lg px-5 py-5 w-[95%] md:w-[82%] h-auto mx-auto flex justify-between"> */}
          {/* Product */}
          <div>
            <div className="flex flex-wrap pb-5 gap-6 md:gap-x-2 md:gap-y-8 items-center md:justify-between">
              {/* First Product */}
              <div className="mx-2 my-2 w-full">
                <label className="font-semibold">محصول اول :</label>
                <div
                  onClick={toggleDropDown1}
                  className="cursor-pointer py-4 border bg-[#1E40AF] mt-3 text-white font-bold border-gray-400 p-2 rounded-lg"
                >
                  برای تغییرات اینجا کلیک کنید{" "}
                </div>
                {isOpen1 && Object.keys(product1).length > 0 && (
                  <div className="mt-2 bg-[#ddeaff] p-2 rounded-lg">
                    <div className="flex items-center justify-between lg:pl-8 mt-2">
                      <label className="lg:text-base font-semibold pl-2">
                        نام محصول:
                      </label>
                      <input
                        type="text"
                        placeholder="نام مورد نظر را وارد کنید"
                        value={product1.title}
                        onChange={(e) =>
                          setProduct1({ ...product1, title: e.target.value })
                        }
                        className="border w-[87%] placeholder:text-sm  placeholder:text-right border-gray-200 text-left  p-2 rounded-lg"
                      />
                    </div>

                    <div className="flex items-center justify-between lg:ml-8 mt-2">
                      <label className="text-sm pl-2">عکس محصول:</label>
                      <input
                        type="text"
                        value={product1.image}
                        onChange={(e) =>
                          setProduct1({ ...product1, image: e.target.value })
                        }
                        placeholder="Url مورد نظر خود را وارد کنید"
                        className="border w-[87%] placeholder:text-sm  placeholder:text-right border-gray-200 text-left  p-2 rounded-lg"
                      />
                    </div>

                    <div className="flex items-center justify-between lg:ml-8 mt-2">
                      <label className="text-sm pl-2">عکس مودال:</label>
                      <input
                        type="text"
                        value={product1.secondImage}
                        onChange={(e) =>
                          setProduct1({
                            ...product1,
                            secondImage: e.target.value,
                          })
                        }
                        placeholder="Url مورد نظر خود را وارد کنید"
                        className="border w-[87%] placeholder:text-sm  placeholder:text-right border-gray-200 text-left  p-2 rounded-lg"
                      />
                    </div>

                    <div className="flex items-center justify-between lg:ml-8 mt-2">
                      <label className="text-sm pl-2">لینک محصول:</label>
                      <input
                        type="text"
                        value={product1.url}
                        onChange={(e) =>
                          setProduct1({ ...product1, url: e.target.value })
                        }
                        placeholder="Url مورد نظر خود را وارد کنید"
                        className="border w-[87%] placeholder:text-sm  placeholder:text-right border-gray-200 text-left  p-2 rounded-lg"
                      />
                    </div>
                    {product1.audio.map((audio, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between lg:ml-8 mt-2"
                      >
                        <label className="text-sm pl-2">{`فیلم ${
                          index + 1
                        }:`}</label>
                        <input
                          type="text"
                          value={audio.audioUrl}
                          onChange={(e) =>
                            setProduct1((prevState) => {
                              const updatedAudio = [...prevState.audio];
                              updatedAudio[index].audioUrl = e.target.value;
                              return { ...prevState, audio: updatedAudio };
                            })
                          }
                          placeholder="Url مورد نظر خود را وارد کنید"
                          className="border w-[52%] placeholder:text-sm  placeholder:text-right border-gray-200 text-left  p-2 rounded-lg"
                        />
                        <input
                          type="text"
                          value={audio.audioName}
                          onChange={(e) =>
                            setProduct1((prevState) => {
                              const updatedAudio = [...prevState.audio];
                              updatedAudio[index].audioName = e.target.value;
                              return { ...prevState, audio: updatedAudio };
                            })
                          }
                          placeholder={`نام فیلم ${index + 1}`}
                          className="border w-[40%] placeholder:text-sm  placeholder:text-right border-gray-200 text-right  p-2 rounded-lg"
                        />
                      </div>
                    ))}

                    <button
                      onClick={() => updateProduct(product1)}
                      className="bg-green-500 px-6 py-2 rounded-lg text-center mt-3 text-white"
                    >
                      ذخیره
                    </button>
                  </div>
                )}
              </div>
              {/* First Product */}

              {/* Second Product */}
              <div className="mx-2 my-2 w-full ">
                <label className="font-semibold">محصول دوم :</label>
                <div
                  onClick={toggleDropDown2}
                  className="cursor-pointer py-4 border bg-[#1E40AF] mt-3 text-white font-bold border-gray-400 p-2 rounded-lg"
                >
                  برای تغییرات اینجا کلیک کنید{" "}
                </div>
                {isOpen2 && Object.keys(product2).length > 0 && (
                  <div className="mt-2 bg-[#ddeaff] p-2 rounded-lg">
                    <div className="flex items-center justify-between lg:pl-8 mt-2">
                      <label className="lg:text-base font-semibold pl-2">
                        نام محصول:
                      </label>
                      <input
                        type="text"
                        placeholder="نام مورد نظر را وارد کنید"
                        value={product2.title}
                        onChange={(e) =>
                          setProduct2({ ...product2, title: e.target.value })
                        }
                        className="border w-[87%] placeholder:text-sm  placeholder:text-right border-gray-200 text-left  p-2 rounded-lg"
                      />
                    </div>

                    <div className="flex items-center justify-between lg:ml-8 mt-2">
                      <label className="text-sm pl-2">عکس محصول:</label>
                      <input
                        type="text"
                        value={product2.image}
                        onChange={(e) =>
                          setProduct2({ ...product2, image: e.target.value })
                        }
                        placeholder="Url مورد نظر خود را وارد کنید"
                        className="border w-[87%] placeholder:text-sm  placeholder:text-right border-gray-200 text-left  p-2 rounded-lg"
                      />
                    </div>

                    <div className="flex items-center justify-between lg:ml-8 mt-2">
                      <label className="text-sm pl-2">قیمت محصول:</label>
                      <input
                        type="text"
                        value={product2.price}
                        onChange={(e) =>
                          setProduct2({ ...product2, price: e.target.value })
                        }
                        placeholder="قیمت مورد نظر خود را وارد کنید"
                        className="border w-[87%] placeholder:text-sm  placeholder:text-right border-gray-200 text-left  p-2 rounded-lg"
                      />
                    </div>

                    <div className="flex items-center justify-between lg:ml-8 mt-2">
                      <label className="text-sm pl-2">لینک محصول:</label>
                      <input
                        type="text"
                        value={product2.url}
                        onChange={(e) =>
                          setProduct2({ ...product2, url: e.target.value })
                        }
                        placeholder="Url مورد نظر خود را وارد کنید"
                        className="border w-[87%] placeholder:text-sm  placeholder:text-right border-gray-200 text-left  p-2 rounded-lg"
                      />
                    </div>
                    <button
                      onClick={() => updateProduct(product2)}
                      className="bg-green-500 px-6 py-2 rounded-lg text-center mt-3 text-white"
                    >
                      ذخیره
                    </button>
                  </div>
                )}
              </div>
              {/* Second Product */}

              {/* Third Product */}
              <div className="mx-2 my-2 w-full ">
                <label className="font-semibold">محصول سوم :</label>
                <div
                  onClick={toggleDropDown3}
                  className="cursor-pointer py-4 border bg-[#1E40AF] mt-3 text-white font-bold border-gray-400 p-2 rounded-lg"
                >
                  برای تغییرات اینجا کلیک کنید{" "}
                </div>
                {isOpen3 && Object.keys(product3).length > 0 && (
                  <div className="mt-2 bg-[#ddeaff] p-2 rounded-lg">
                    <div className="flex items-center justify-between lg:pl-8 mt-2">
                      <label className="lg:text-base font-semibold pl-2">
                        نام محصول:
                      </label>
                      <input
                        type="text"
                        placeholder="نام مورد نظر را وارد کنید"
                        value={product3.title}
                        onChange={(e) =>
                          setProduct3({ ...product3, title: e.target.value })
                        }
                        className="border w-[87%] placeholder:text-sm  placeholder:text-right border-gray-200 text-left  p-2 rounded-lg"
                      />
                    </div>

                    <div className="flex items-center justify-between lg:ml-8 mt-2">
                      <label className="text-sm pl-2">عکس محصول:</label>
                      <input
                        type="text"
                        value={product3.image}
                        onChange={(e) =>
                          setProduct3({ ...product3, image: e.target.value })
                        }
                        placeholder="Url مورد نظر خود را وارد کنید"
                        className="border w-[87%] placeholder:text-sm  placeholder:text-right border-gray-200 text-left  p-2 rounded-lg"
                      />
                    </div>

                    <div className="flex items-center justify-between lg:ml-8 mt-2">
                      <label className="text-sm pl-2">قیمت محصول:</label>
                      <input
                        type="text"
                        value={product3.price}
                        onChange={(e) =>
                          setProduct3({ ...product3, price: e.target.value })
                        }
                        placeholder="قیمت مورد نظر خود را وارد کنید"
                        className="border w-[87%] placeholder:text-sm  placeholder:text-right border-gray-200 text-left  p-2 rounded-lg"
                      />
                    </div>

                    {product3.audio.map((audio, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between lg:ml-8 mt-2"
                      >
                        <label className="text-sm pl-2">{`فیلم ${
                          index + 1
                        }:`}</label>
                        <input
                          type="text"
                          value={audio.audioUrl}
                          onChange={(e) =>
                            setProduct3((prevState) => {
                              const updatedAudio = [...prevState.audio];
                              updatedAudio[index].audioUrl = e.target.value;
                              return { ...prevState, audio: updatedAudio };
                            })
                          }
                          placeholder="Url مورد نظر خود را وارد کنید"
                          className="border w-[52%] placeholder:text-sm  placeholder:text-right border-gray-200 text-left  p-2 rounded-lg"
                        />
                        <input
                          type="text"
                          value={audio.audioName}
                          onChange={(e) =>
                            setProduct3((prevState) => {
                              const updatedAudio = [...prevState.audio];
                              updatedAudio[index].audioName = e.target.value;
                              return { ...prevState, audio: updatedAudio };
                            })
                          }
                          placeholder={`نام فیلم ${index + 1}`}
                          className="border w-[40%] placeholder:text-sm  placeholder:text-right border-gray-200 text-right  p-2 rounded-lg"
                        />
                      </div>
                    ))}
                    <button
                      onClick={() => updateProduct(product3)}
                      className="bg-green-500 px-6 py-2 rounded-lg text-center mt-3 text-white"
                    >
                      ذخیره
                    </button>
                  </div>
                )}
              </div>
              {/* Third Product */}

              <div className="mx-2 my-2 w-full ">
                <label className="font-semibold">محصول چهارم :</label>
                <div
                  onClick={toggleDropDown4}
                  className="cursor-pointer py-4 border bg-[#1E40AF] mt-3 text-white font-bold border-gray-400 p-2 rounded-lg"
                >
                  برای تغییرات اینجا کلیک کنید{" "}
                </div>
                {isOpen4 && Object.keys(product4).length > 0 && (
                  <div className="mt-2 bg-[#ddeaff] p-2 rounded-lg">
                    <div className="flex items-center justify-between lg:pl-8 mt-2">
                      <label className="lg:text-base font-semibold pl-2">
                        نام محصول:
                      </label>
                      <input
                        type="text"
                        placeholder="نام مورد نظر را وارد کنید"
                        value={product4.title}
                        onChange={(e) =>
                          setProduct4({ ...product4, title: e.target.value })
                        }
                        className="border w-[87%] placeholder:text-sm  placeholder:text-right border-gray-200 text-left  p-2 rounded-lg"
                      />
                    </div>

                    <div className="flex items-center justify-between lg:ml-8 mt-2">
                      <label className="text-sm pl-2">قیمت محصول:</label>
                      <input
                        type="text"
                        value={product4.price}
                        onChange={(e) =>
                          setProduct4({ ...product4, price: e.target.value })
                        }
                        placeholder="قیمت مورد نظر خود را وارد کنید"
                        className="border w-[87%] placeholder:text-sm  placeholder:text-right border-gray-200 text-left  p-2 rounded-lg"
                      />
                    </div>
                    {product4.audio.map((audio, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between lg:ml-8 mt-2"
                      >
                        <label className="text-sm pl-2">{`فیلم ${
                          index + 1
                        }:`}</label>
                        <input
                          type="text"
                          value={audio.audioUrl}
                          onChange={(e) =>
                            setProduct4((prevState) => {
                              const updatedAudio = [...prevState.audio];
                              updatedAudio[index].audioUrl = e.target.value;
                              return { ...prevState, audio: updatedAudio };
                            })
                          }
                          placeholder="Url مورد نظر خود را وارد کنید"
                          className="border w-[52%] placeholder:text-sm  placeholder:text-right border-gray-200 text-left  p-2 rounded-lg"
                        />
                        <input
                          type="text"
                          value={audio.audioName}
                          onChange={(e) =>
                            setProduct4((prevState) => {
                              const updatedAudio = [...prevState.audio];
                              updatedAudio[index].audioName = e.target.value;
                              return { ...prevState, audio: updatedAudio };
                            })
                          }
                          placeholder={`نام فیلم ${index + 1}`}
                          className="border w-[40%] placeholder:text-sm  placeholder:text-right border-gray-200 text-right  p-2 rounded-lg"
                        />
                      </div>
                    ))}
                    <button
                      onClick={() => updateProduct(product4)}
                      className="bg-green-500 px-6 py-2 rounded-lg text-center mt-3 text-white"
                    >
                      ذخیره
                    </button>
                  </div>
                )}
              </div>

              <div className="mx-2 my-2 w-full ">
                <label className="font-semibold">محصول تخفیفی :</label>
                <div
                  onClick={toggleDropDown5}
                  className="cursor-pointer py-4 border bg-[#1E40AF] mt-3 text-white font-bold border-gray-400 p-2 rounded-lg"
                >
                  برای تغییرات اینجا کلیک کنید{" "}
                </div>
                {isOpen5 && Object.keys(product5).length > 0 && (
                  <div className="mt-2 bg-[#ddeaff] p-2 rounded-lg">
                    <div className="flex items-center justify-between lg:pl-8 mt-2">
                      <label className="lg:text-base font-semibold pl-2">
                        نام محصول:
                      </label>
                      <input
                        type="text"
                        placeholder="نام مورد نظر را وارد کنید"
                        value={product5.title}
                        onChange={(e) =>
                          setProduct5({ ...product5, title: e.target.value })
                        }
                        className="border w-[87%] placeholder:text-sm  placeholder:text-right border-gray-200 text-left  p-2 rounded-lg"
                      />
                    </div>

                    <div className="flex items-center justify-between lg:ml-8 mt-2">
                      <label className="text-sm pl-2">قیمت محصول:</label>
                      <input
                        type="text"
                        value={product5.price}
                        onChange={(e) =>
                          setProduct5({ ...product5, price: e.target.value })
                        }
                        placeholder="قیمت مورد نظر خود را وارد کنید"
                        className="border w-[87%] placeholder:text-sm  placeholder:text-right border-gray-200 text-left  p-2 rounded-lg"
                      />
                    </div>
                    {product5.audio.map((audio, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between lg:ml-8 mt-2"
                      >
                        <label className="text-sm pl-2">{`فیلم ${
                          index + 1
                        }:`}</label>
                        <input
                          type="text"
                          value={audio.audioUrl}
                          onChange={(e) =>
                            setProduct5((prevState) => {
                              const updatedAudio = [...prevState.audio];
                              updatedAudio[index].audioUrl = e.target.value;
                              return { ...prevState, audio: updatedAudio };
                            })
                          }
                          placeholder="Url مورد نظر خود را وارد کنید"
                          className="border w-[52%] placeholder:text-sm  placeholder:text-right border-gray-200 text-left  p-2 rounded-lg"
                        />
                        <input
                          type="text"
                          value={audio.audioName}
                          onChange={(e) =>
                            setProduct5((prevState) => {
                              const updatedAudio = [...prevState.audio];
                              updatedAudio[index].audioName = e.target.value;
                              return { ...prevState, audio: updatedAudio };
                            })
                          }
                          placeholder={`نام فیلم ${index + 1}`}
                          className="border w-[40%] placeholder:text-sm  placeholder:text-right border-gray-200 text-right  p-2 rounded-lg"
                        />
                      </div>
                    ))}
                    <button
                      onClick={() => updateProduct(product5)}
                      className="bg-green-500 px-6 py-2 rounded-lg text-center mt-3 text-white"
                    >
                      ذخیره
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* </div> */}
        </div>
      </div>
      {/* Photo Pages */}
      <div className="mx-auto lg:mx-0 lg:flex lg:flex-col w-full lg:w-[80vw] h-screen">
        <div className="mt-0 mb-16 mx-4 lg:mx-16">
          {/* Photos */}
          <div>
            <h2 className="font-bold text-xl">بنر ها</h2>
            <div className="w-[50px] h-0.5 mt-1 bg-black"></div>

            <div className="my-10 bg-slate-50 shadow-xl h-auto w-[100%] lg:w-[90%] p-8 rounded-xl">
              <div className="flex flex-wrap justify-between gap-6 pb-5 md:gap-x-4 md:gap-y-8 items-center  ">
                {/* Second Product */}
                <div className="mx-2 my-2 w-full ">
                  <div
                    onClick={toggleDropDownImg1}
                    className="cursor-pointer py-4 border bg-[#1E40AF] mt-3 text-white font-bold border-gray-400 p-2 rounded-lg"
                  >
                    برای تغییرات اینجا کلیک کنید{" "}
                  </div>
                  {isOpenImg1 && Object.keys(product1).length > 0 && (
                    <div className="mt-2 bg-[#ddeaff] p-2 rounded-lg">
                      {ImageUrl1.banner.map((banner, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center lg:ml-8 mt-2"
                        >
                          <label className="text-sm pl-2">{`بنر ${
                            index + 1
                          }:`}</label>
                          <input
                            type="text"
                            value={banner.bannerUrl}
                            onChange={(e) => {
                              setImageUrl1((prevState) => {
                                const updatedBanners = [...prevState.banner];
                                updatedBanners[index].bannerUrl =
                                  e.target.value;
                                return { ...prevState, banner: updatedBanners };
                              });
                            }}
                            placeholder="Url مورد نظر خود را وارد کنید"
                            className="border w-[89%] placeholder:text-sm placeholder:text-right border-gray-200 text-left p-2 rounded-lg"
                          />
                        </div>
                      ))}
                      <button
                        onClick={() => updateBanners(ImageUrl1.banner)}
                        className="bg-green-500 px-6 py-2 rounded-lg text-center mt-3 text-white"
                      >
                        ذخیره
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Photo Pages */}
    </div>
  );
};

export default Products;
