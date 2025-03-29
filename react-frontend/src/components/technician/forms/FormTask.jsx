import React, { useEffect, useState } from "react";
import taskService from "../../../services/api/taskService";
import { X } from "lucide-react";
import '../../../styles/st-form.css'
import Toggle from "../../common/Toggle";
import delayTaskService from "../../../services/api/delayTaskService";
import ConfirmDialog from "../../common/ConfirmDialog";
import SelectCategoryDelay from "../others/SelectCategoryDelay";

function FormTask({ closeForm, taskId, initialData, onSave }) {
  const [formData, setFormData] = useState({
    startTask: initialData?.startTask || "",
    endTask: initialData?.endTask || "",
    delays: [],
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasDelay, setHasDelay] = useState(false);
  const [newDelay, setNewDelay] = useState({ 
    startTime: "", 
    endTime: "", 
    categoryDelayId: "",
    observation: ""
  });
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  useEffect(() => {
    loadDelays();
  }, []);

  const loadDelays = async () => {
    try {
      const response = await delayTaskService.delayTaskList(taskId);
      setFormData((prev) => ({ ...prev, delays: response.data.tasksDelay }));
      setHasDelay(response.data.tasksDelay.length > 0);
    } catch (error) {
      console.error("Error al cargar demoras", error);
    }
  };

  const handleRegisterStart = async () => {
    setIsLoading(true);
    try {
      const response = await taskService.updateTaskStart(taskId);
      setFormData((prev) => ({ ...prev, startTask: response.startTask }));
      closeForm();
      if (onSave) onSave();
    } catch (error) {
      console.log(error);
      setErrorMessage("Error al registrar el inicio. Inténtelo de nuevo.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegisterEnd = async () => {
    setIsLoading(true);
    try {
      const response = await taskService.updateTaskEnd(taskId);
      setFormData((prev) => ({ ...prev, endTask: response.endTask }));
      closeForm();
      if (onSave) onSave();
    } catch (error) {
      console.log(error);
      setErrorMessage("Error al registrar el fin. Inténtelo de nuevo.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveDelay = async () => {
    if (!newDelay.startTime || !newDelay.endTime || !newDelay.categoryDelayId) {
      setErrorMessage("Todos los campos de la demora son obligatorios.");
      return;
    }

    setIsLoading(true);
    try {
      await delayTaskService.createTaskDelayStart({ ...newDelay, taskId });
      setNewDelay({ startTime: "", endTime: "", categoryDelayId: "", observation: "" });
      handleSave();
      loadDelays();
    } catch (error) {
      console.error("Error al agregar demora", error);
      setErrorMessage("Error al guardar la demora. Intente de nuevo.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelayChange = (e) => {
    setNewDelay({ ...newDelay, categoryDelayId: e.target.value });
  };

  const handleSave = () => {
    loadDelays();
  };

  return (
    <div className="container-form relative">
      <button className="absolute top-5 right-5 bg-white hover:bg-red-500 text-gray-500 hover:text-white transition " type="button" onClick={closeForm}><X /></button>

      <div className="title-form">
        <h2>Actualizar tarea</h2>
      </div>

      <form>
        <div className="group-form">
          <div className="subgroup-form">
            <span className="block text-gray-700 font-semibold mb-1">Fecha/hora inicio</span>
            {!formData.startTask ? (
              <button className="w-full" onClick={handleRegisterStart} disabled={isLoading}>
                {isLoading ? "Guardando..." : "Registrar Inicio"}
              </button>
            ) : (
              <input type="text" value={formData.startTask} disabled />
            )}
          </div>

          {formData.startTask &&  (
            <div className="subgroup-form">
              <span className="block text-gray-700 font-semibold mb-1">Fecha/hora fin</span>
              {!formData.endTask ? (
                <button onClick={(e) => { e.preventDefault(); setShowConfirmDialog(true); }} disabled={isLoading}>
                  {isLoading ? "Guardando..." : "Registrar Fin"}
                </button>
              ) : (
                <input type="text" value={formData.endTask} disabled />
              )}
            </div>
          )}
          {formData.startTask && !formData.endTask &&  (
            <div className="subgroup-form">
              <span>¿Hubo demora?</span>
              <Toggle isChecked={hasDelay} onToggle={setHasDelay} />
            </div>
          )}
          {hasDelay && !formData.endTask && (
            <>
              <h3>Registrar demora</h3>
              <div className="subgroup-form">
                <label htmlFor="startTime">Inicio de demora</label>
                <input
                  id="startTime"
                  type="time"
                  value={newDelay.startTime}
                  onChange={(e) => setNewDelay({ ...newDelay, startTime: e.target.value })}
                  required
                />
              </div>
              <div className="subgroup-form">
                <label htmlFor="endTime">Fin de demora</label>
                <input
                  id="endTime"
                  type="time"
                  value={newDelay.endTime}
                  onChange={(e) => setNewDelay({ ...newDelay, endTime: e.target.value })}
                  required
                />
              </div>
              <div className="subgroup-form">
                <label htmlFor="select-type">Tipo de demora</label>
                <SelectCategoryDelay formData={newDelay} handleChange={handleDelayChange}/>
              </div>
              <div className="subgroup-form">
                <label htmlFor="select-type">Observación</label>
                <textarea 
                  id="observation"
                  name="observation"
                  placeholder='Observación (max. 200 caracteres)'
                  value={newDelay.observation}
                  onChange={(e) => setNewDelay({ ...newDelay, observation: e.target.value })}
                  maxLength={200} 
                />
              </div>
              <div className="subgroup-form">
                <button onClick={handleSaveDelay} disabled={isLoading}>
                  {isLoading ? "Guardando..." : "Guardar demora"}
                </button>
              </div>
            </>
          )}
        </div>
        {formData.delays.length > 0 && (
          <div className="group-form tbl-delay">
            <div className="subgroup-form">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Lista de demoras registradas</h3>
            <table className="w-full border border-gray-200 rounded-lg shadow-sm">
                <thead className="bg-gray-100 text-gray-700 uppercase text-sm">
                  <tr>
                    <th className="py-2 px-4 border-b">Inicio</th>
                    <th className="py-2 px-4 border-b">Fin</th>
                    <th className="py-2 px-4 border-b">Tipo</th>
                    <th className="py-2 px-4 border-b">Obs.</th>
                  </tr>
                </thead>
                <tbody>
                  {formData.delays.map((delay, index) => (
                    <tr key={index}>
                      <td>{delay.startTime}</td>
                      <td>{delay.endTime}</td>
                      <td>{delay.descripcionDelay}</td>
                      <td>{delay.observation}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </form>
      {
        showConfirmDialog && (
          <ConfirmDialog
            isOpen={showConfirmDialog}
            onClose={() => setShowConfirmDialog(false)}
            onConfirm={() => {
              setShowConfirmDialog(false);
              handleRegisterEnd();
            }}
            title="¿Seguro desea finalizar la tarea?"
            message="Nota: ya no podrá hacer cambios ni registrar demoras."
          />
        )
      }
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
}

export default FormTask;