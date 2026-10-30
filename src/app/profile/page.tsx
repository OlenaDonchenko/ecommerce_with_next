export default async function ProfilePage() {
  const res = await fetch("https://fakestoreapi.com/users/1");

  const user = await res.json();

    return (
    <div className="min-h-[70vh] flex items-center justify-center p-6 bg-base-200">

        <div className="card bg-base-100 shadow-xl w-full max-w-lg">

        <div className="card-body items-center text-center">

            <div className="avatar placeholder mb-4">
            <div className="bg-purple-500 text-white rounded-full w-24 h-24 flex items-center justify-center">
                <span className="text-4xl text-center font-bold">
                {user.name.firstname.charAt(0).toUpperCase()}
                </span>
            </div>
            </div>

            <h1 className="text-3xl font-bold capitalize">
            {user.name.firstname} {user.name.lastname}
            </h1>

            <p className="text-base-content/60">
            @{user.username}</p>

            <div className="divider"></div>

            <div className="w-full text-left space-y-4">
                <div className="w-full flex justify-center mt-2">
                    <div className="badge badge-lg badge-outline gap-2 p-4">
                        📍 {user.address.city.charAt(0).toUpperCase() + user.address.city.slice(1)}
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-base-content/60">Phone</span>
                    <span className="font-semibold">{user.phone}</span>
                </div>
            </div>
        </div>
        </div>
    </div>
    );
}