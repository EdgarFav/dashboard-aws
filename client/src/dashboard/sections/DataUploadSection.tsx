import { useState, useRef } from 'react';
import { uploadSalesMethod } from '../services/sales-service';
import toast from 'react-hot-toast';
import {
  Upload,
  FileText,
  CheckCircle2,
  AlertCircle,
  Loader2,
  X,
} from 'lucide-react';

const DataUploadSection = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.name.endsWith('.csv')) {
        setFile(droppedFile);
      } else {
        toast.error('Por favor, sube solo archivos .csv');
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const removeFile = () => {
    setFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleUpload = async () => {
    if (!file) return;

    setIsUploading(true);
    try {
      const response = await uploadSalesMethod(file);
      toast.success(`¡Éxito! Se han cargado ${response.data.count} registros.`);
      setFile(null);
    } catch (error: any) {
      const message =
        error.response?.data?.message || 'Error al subir el archivo';
      toast.error(message);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Carga de Datos</h1>
        <p className="text-slate-500">
          Importa tus registros de ventas mediante archivos CSV.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={`relative border-2 border-dashed rounded-3xl p-12 flex flex-col items-center justify-center transition-all ${
              dragActive
                ? 'border-indigo-500 bg-indigo-50/50 scale-[1.01]'
                : 'border-slate-200 bg-white hover:border-slate-300'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />

            {!file ? (
              <>
                <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-4">
                  <Upload size={32} />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  Arrastra tu archivo CSV aquí
                </h3>
                <p className="text-slate-500 text-sm text-center max-w-xs">
                  O haz clic para explorar tus archivos. Solo se admiten
                  formatos .csv (UTF-8).
                </p>
              </>
            ) : (
              <div className="w-full max-w-sm bg-slate-50 rounded-2xl p-6 border border-slate-200 relative">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile();
                  }}
                  className="absolute -top-2 -right-2 w-8 h-8 bg-white border border-slate-200 rounded-full flex items-center justify-center text-slate-400 hover:text-rose-600 shadow-sm transition-colors"
                >
                  <X size={16} />
                </button>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center">
                    <FileText size={24} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-slate-900 truncate">
                      {file.name}
                    </p>
                    <p className="text-xs text-slate-500">
                      {(file.size / 1024).toFixed(1)} KB
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="mt-8 flex justify-end">
            <button
              onClick={handleUpload}
              disabled={!file || isUploading}
              className="bg-indigo-600 text-white font-bold px-8 py-3 rounded-2xl shadow-lg shadow-indigo-100 hover:bg-indigo-700 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isUploading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  <span>Subiendo...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 size={20} />
                  <span>Procesar Archivo</span>
                </>
              )}
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
              <AlertCircle size={20} className="text-amber-500" />
              Guía de Formato
            </h3>
            <p className="text-sm text-slate-500 mb-6 leading-relaxed">
              El archivo debe contener las siguientes columnas exactas para una
              importación correcta:
            </p>
            <ul className="space-y-3">
              {[
                'productName',
                'amount',
                'category',
                'customerEmail',
                'date',
              ].map((col) => (
                <li
                  key={col}
                  className="flex items-center gap-3 text-xs font-mono text-slate-600 bg-slate-50 p-2 rounded-lg"
                >
                  <span className="w-2 h-2 bg-indigo-400 rounded-full"></span>
                  {col}
                </li>
              ))}
            </ul>
            <div className="mt-8 p-4 bg-indigo-50 rounded-2xl">
              <p className="text-xs text-indigo-700 font-medium leading-relaxed">
                Tip: La columna 'date' es opcional, si se omite se usará la
                fecha actual.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataUploadSection;
