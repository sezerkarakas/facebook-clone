import Account from "../Account/Account";

const PostCard = ({ photo }) => {
  return (
    <div className="container h-fit flex flex-col  bg-zinc-800 mb-10 rounded-md ">
      <div className="pb-5 pt-2 pl-2">
        <div className="flex flex-row justify-start items-start gap-2 ">
          <Account />
          <p className="text-xl">Sezer Karakaş</p>
        </div>
        <p>Değerli babam</p>
      </div>
      <div className="flex flex-row justify-center items-center w-full bg-neutral-600">
        <img className="object-cover" src={photo.url} alt="" />
      </div>
      <div>
        <div className="flex flex-row justify-between py-2 px-4 items-center">
          <p>245 B</p>
          <div className="flex flex-row justify-around gap-2">
            <p>1,9 B yorum</p>
            <p>604 paylaşım</p>
          </div>
        </div>
        <div className="flex flex-row justify-center items-center">
          <div className="border-b border-zinc-700 w-11/12 "></div>
        </div>
        <div className="flex flex-row px-7 py-2  justify-center items-center">
          <p className="rounded-md w-1/3 h-8 flex items-center justify-center hover:bg-zinc-600">Beğen</p>
          <p className="rounded-md w-1/3 h-8 flex items-center justify-center hover:bg-zinc-600">Yorum Yap</p>
          <p className="rounded-md w-1/3 h-8 flex items-center justify-center hover:bg-zinc-600">Paylaş</p>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
