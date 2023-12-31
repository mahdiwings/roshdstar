import axios from "axios";
import React, { useEffect, useState } from "react";
import { BsFillTrash3Fill } from "react-icons/bs";
import { BiSolidMessageSquareEdit } from "react-icons/bi";
import { BiSearch } from "react-icons/bi";
import Modal from "react-modal";

const Users = () => {
  const [token, setToken] = useState("");
  const [users, setUsers] = useState([]);
  const [isModalEditeOpen, setIsModalEditeOpen] = useState(false); // وضعیت مدال
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  // ویژگی‌های ایمیل و رمز عبور جهت ویرایش
  const [editEmail, setEditEmail] = useState("");
  const [editPassword, setEditPassword] = useState("");
  const [id, setId] = useState("");
  // Search Box
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState(users);

  
  // Search Box

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
    const fetchUsers = async () => {
      try {
        const response = await axios.get("https://startmali.runflare.run/api/user", {
          headers: {
            authorization: `Bearer ${storedToken}`,
          },
        });
        console.log(response);
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = (_id) => {
    // نمایش مدال تأیید حذف و تنظیم کاربری که باید حذف شود
    setUserToDelete(_id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    // انجام حذف کاربر از API و بستن مدال تأیید حذف
    axios
      .delete(`https://startmali.runflare.run/api/user/delete/${userToDelete}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        // بعد از حذف کاربر، لیست کاربران را به روز کنید
        const updatedUsers = users.filter(
          (user) => user.email !== userToDelete
        );
        setUsers(updatedUsers);
      })
      .catch((error) => {
        console.log(error.response.data);
        console.log(userToDelete);
        alert("خطا در انجام عملیات حذف کاربران", error.response.data);
      })
      .finally(() => {
        // بستن مدال تأیید حذف
        setIsDeleteModalOpen(false);
      });
  };

  const handleEdit = (_id) => {
    // باز کردن مدال و پر کردن ویژگی‌های ایمیل و رمز عبور براساس اطلاعات کاربر
    const user = users.find((user) => user._id === _id);
    if (user) {
      setId(user._id);
      setEditEmail(user.email);
      setEditPassword(user.password);
      setIsModalEditeOpen(true);
    }
  };
  const openModal = () => {
    setIsModalEditeOpen(true);
  };

  const closeModal = () => {
    setIsModalEditeOpen(false);
  };

  const saveEditedUser = () => {
    // ارسال درخواست به API برای به‌روزرسانی اطلاعات کاربر
    axios
      .patch(
        `https://startmali.runflare.run/api/user/update/${id}`,
        {
          email: editEmail,
          password: editPassword,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        // بعد از به‌روزرسانی، مدال را ببندید و لیست کاربران را به روز کنید
        setIsModalEditeOpen(false);
        const updatedUsers = users.map((user) =>
          user.email === editEmail ? { ...user, password: editPassword } : user
        );
        setUsers(updatedUsers);
        closeModal();
      })
      .catch((error) => {
        console.log(error.response.data);
        alert("خطا در بروزرسانی کاربر:", error.message);
      });
  };
  useEffect(() => {
    const filtered = users.filter(
      (user) =>
        user.email.includes(searchTerm) ||
        user.phoneNumber.includes(searchTerm)  ||
        (user.fullName && user.fullName.includes(searchTerm))
    );
    setFilteredUsers(filtered);
  }, [searchTerm, users]);

  return (
    <div className="w-[98%] lg:w-[88%] mx-auto mt-14 shadow-xl px-5 rounded-xl h-[500px] mb-20 bg-white border-[0.2px] overflow-x-auto py-5">
      <div>
        <h2 className="pb-3 text-xl font-bold">لیست کاربران</h2>
        <div className="w-[80%] flex mb-5 bg-gray-50 mt-2 mx-auto shadow-md border-gray-300 border-[1px] rounded-xl">
          <input
            className="w-[90%] rounded-xl outline-none bg-gray-50 px-3 py-2.5 "
            placeholder="جستجو کاربر..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="w-[10%] flex justify-center items-center rounded-l-lg rounded-bl-lg">
            <BiSearch className="text-[#193daa] text-4xl md:text-3xl" />
          </div>
        </div>
        <table className="w-[100%]">
          <thead>
            <tr className="flex bg-[#F8F9FA] shadow-sm rounded-xl px-4 py-3 justify-between items-center">
              <th className="w-[180px]">نام و نام خانوادگی</th>
              <th className="w-[190px]">ایمیل</th>
              <th className="w-[100px]">شماره تلفن</th>
              <th className="w-[90px]">تاریخ ثبت نام</th>
              <th className="w-[110px]">عملیات</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers &&
              filteredUsers.map((user, index) => (
                <tr
                  className="flex justify-start text-center py-4 hover:bg-[#F8F9FA] pr-4 items-center"
                  key={index}
                >
                  <td className="w-[200px]">{user.fullName}</td>
                  <td className="w-[300px]">{user.email}</td>
                  <td className="w-[19%] mr-2.5">{user.phoneNumber}</td>
                  <td className="w-[17%] ml-2 mr-2">
                    {user.updatedAt.slice(0, 10)}
                  </td>
                  <td className="w-[18%] mr-2">
                    <button onClick={() => handleEdit(user._id)}>
                      <BiSolidMessageSquareEdit className="text-xl m-1 lg:text-2xl" />
                    </button>
                    <button
                      className="w-[25%]"
                      onClick={() => handleDelete(user._id)}
                    >
                      <BsFillTrash3Fill className="text-xl m-1 lg:text-2xl" />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* مدال ویرایش */}
      {isModalEditeOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white w-full m-2 py-10 lg:w-1/3 p-4 rounded-lg shadow-black shadow-2xl">
            <h2 className="text-xl font-bold mb-4">ویرایش کاربر</h2>
            <form>
              <div className="mb-4">
                <label className="block mb-2">ایمیل:</label>
                <input
                  type="text"
                  value={editEmail}
                  placeholder="تغییر ایمیل کاربر"
                  onChange={(e) => setEditEmail(e.target.value)}
                  className="border rounded-lg p-2 bg-slate-50 w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">رمز عبور:</label>
                <input
                  type="password"
                  value={editPassword}
                  placeholder="تغییر رمز کاربر"
                  onChange={(e) => setEditPassword(e.target.value)}
                  className="border rounded-lg p-2 w-full bg-slate-50"
                />
              </div>
              <button
                type="button"
                onClick={saveEditedUser}
                className="bg-blue-500 text-white rounded px-4 py-2"
              >
                ذخیره
              </button>
              <button
                type="button"
                onClick={closeModal}
                className="bg-red-500 text-white rounded px-3 py-2 mr-2"
              >
                لغو
              </button>
            </form>
          </div>
        </div>
      )}

      {/* مدال تأیید حذف */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white w-full m-2 py-10 lg:w-1/3 p-4 rounded-lg shadow-black shadow-2xl">
            <h2 className="text-xl font-bold mb-4">تأیید حذف کاربر</h2>
            <p>آیا از حذف کاربر مطمئن هستید؟</p>
            <button
              type="button"
              onClick={confirmDelete}
              className="bg-red-500 text-white rounded px-4 py-2 mt-4"
            >
              بله
            </button>
            <button
              type="button"
              onClick={() => setIsDeleteModalOpen(false)}
              className="bg-blue-500 text-white rounded px-3 py-2 mt-4 mr-2"
            >
              خیر
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
