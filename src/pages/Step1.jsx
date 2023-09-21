import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaCheckCircle } from "react-icons/fa";
import Modal from "../components/Modal";

const Step1 = () => {
  document.title = "رایگان رونمایی کتاب";

  const [imageUrl, setImageUrl] = useState("");
  const [imageTitle, setImageTitle] = useState("");

  useEffect(() => {
    const Book1UrlImage =
      "https://roshdstar.onrender.com/api/products/email/free";

    axios
      .get(Book1UrlImage)
      .then((res) => {
        setImageUrl(res.data[0].image);
        console.log(res.data);
      })
      .catch((err) => {
        console.error("error handling", err);
      });

    const titleImageUrl =
      "https://roshdstar.onrender.com/api/products/email/free";

    axios
      .get(titleImageUrl)
      .then((res) => {
        setImageTitle(res.data[0].title);
      })
      .catch((err) => {
        console.error("error handling", err);
      });
  }, []);

  return (
    <div className="border-t-8 border-cyan-600">
      <div className="flex flex-col text-right justify-center mx-auto items-center lg:w-[1080px] lg:items-start sm:flex-row">
        <div className="p-6 w-full lg:w-2/3">
          <h2 className="font-bold text-red-700 text-3xl">
            <span className="underline">رایگان</span> رونمایی کتاب
          </h2>
          <p className="text-gray-700">
            هیچ کارت بانکی نیاز نیست. دانلود رایگان
          </p>
          <p className="text-2xl lg:text-3xl mt-3 font-bold py-4">
            101راز روزانه ای که تبدیل میکنه
          </p>
          <p className="font-bold text-2xl lg:text-3xl  text-red-700">
            ارتباطات را به پول
          </p>

          <p className="font-medium py-5">
            این کتاب رایگانو دانلود کنید بلافاصله و هر آرزویی را به واقعیت تبدیل
            کنید
          </p>
          {/* UL List Tag Text */}
          <div className="mr-2 lg:mr-5 pl-12  my-4">
            <div className="flex items-center my-2">
              <FaCheckCircle className="text-[110.1px] lg:text-[57.2px] text-[#8ddd8b] mx-3" />
              <p className="leading-8">
                کشف کنید{" "}
                <span className="text-[#0a2441] underline font-bold">
                  سم شماره #1
                </span>{" "}
                چه چیزی بیشترین تأثیر گذاری را در موفقیت مالی شما دارد.
              </p>
            </div>

            <div className="flex items-center  my-2">
              <FaCheckCircle className="text-[142.3px] lg:text-[79px] text-[#8ddd8b] mx-3" />
              <p className="leading-8">
                <span className="underline font-bold text-[#0a2441]">
                  {" "}
                  ترفند و ارتباط مخفی
                </span>{" "}
                که می‌تونه قدرت خارق‌العاده بده ، را یاد بگیرید- اون 1 تغییر
                ساده را یاد بگیرید تا ایجادش کنید!
              </p>
            </div>

            <div className="flex items-center  my-2">
              <FaCheckCircle className="text-[137.5px] lg:text-[74px] text-[#8ddd8b] mx-3" />
              <p className="leading-8">
                <span className="underline font-bold text-[#0a2441]">
                  قوانین طلایی
                </span>
                – یاد بگیرید چطور مهارت های پولساز را شناسایی کنید – تا هر کاری
                ۱۰ برابر سریعتر انجام بشه…
              </p>
            </div>

            <br />

            {/* End UL List Tag Text */}
          </div>
        </div>

        {/* Image Book */}
        <div className="pb-3 w-[100%] md:w-[40%] -m-20 lg:m-12">
          <div className="w-[370px] lg:scale-125 lg:mt-10 lg:w-[550px]">
            <img src={imageUrl} alt={imageTitle} />
          </div>
        </div>
      </div>
      {/* Button Next Page */}
      <div className="flex justify-center mt-5 lg:-mt-5">
        <Modal />
      </div>
      {/* Button Next Page */}
    </div>
  );
};

export default Step1;