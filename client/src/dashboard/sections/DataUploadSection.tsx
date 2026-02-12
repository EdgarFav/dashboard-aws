const DataUploadSection = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Carga de Datos Empresariales
        </h1>
        <p className="text-slate-500">
          Sube tus archivos CSV o Excel para procesar el pronóstico de demanda.
        </p>
      </div>

      <div className="bg-white p-10 rounded-3xl border-2 border-dashed border-slate-200 hover:border-indigo-400 transition-colors group flex flex-col items-center justify-center text-center cursor-pointer">
        <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
          <svg
            className="w-8 h-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-slate-900">
          Arrastra tus archivos aquí
        </h3>
        <p className="text-slate-500 mt-2 max-w-xs">
          Soporta formatos .csv, .xlsx. Tamaño máximo 20MB.
        </p>
        <button className="mt-6 px-6 py-2.5 bg-indigo-600 text-white rounded-xl font-medium shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-colors">
          Explorar Archivos
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <h3 className="font-semibold text-slate-900">Cargas Recientes</h3>
        </div>
        <div className="divide-y divide-slate-100">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="px-6 py-4 flex items-center justify-between hover:bg-slate-50/50 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-slate-100 rounded-lg">
                  <svg
                    className="w-5 h-5 text-slate-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900">
                    ventas_q1_2024.csv
                  </p>
                  <p className="text-xs text-slate-400">
                    Hace 2 horas • 1.2 MB
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="px-2 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-bold uppercase rounded-md">
                  Procesado
                </span>
                <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DataUploadSection;
