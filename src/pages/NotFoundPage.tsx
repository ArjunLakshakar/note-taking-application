
const NotFoundPage = () => {
  return (
    <div>
     
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-10 rounded-lg shadow-lg text-center">
          <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
          <p className="text-gray-600 mb-8">Page Not Found</p>
          <a
            href="/"
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Go to Home
          </a>
        </div>
      </div>

    </div>
  )
}

export default NotFoundPage;