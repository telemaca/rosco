import { useRouter } from "next/navigation";
import styles from "./RoscoLanding.module.scss";

const RoscoLanding = () => {
  const router = useRouter();

  const handleStartRosco = (): void => {
    router.push("/rosco");
  };

  const gameRules: string[] = [
    "Respondé a las definiciones de cada letra.",
    'Decí "PASAPALABRA" si no sabés la respuesta.',
    "Completá todo el rosco para ganar",
    "El tiempo es limitado, ¡pensá rápido!",
  ];

  return (
    <div className={styles.mainContainer}>
      <h1 className={styles.title}>EL ROSCO</h1>

      <div className={styles.gameInfo}>
        <div className={styles.infoSection}>
          <h3>Objetivo</h3>
          <p>
            Debes encontrar una palabra por cada letra del abecedario. Las
            palabras pueden empezar con la letra o contenerla según la
            definición. Ganás cuando completás todas las letras antes de que se
            acabe el tiempo.
          </p>
        </div>
        <div className={styles.infoSection}>
          <h3>¿Cómo se juega?</h3>
          <ul className={styles.rulesList}>
            {gameRules.map((rule, index) => (
              <li key={index}>{rule}</li>
            ))}
          </ul>
        </div>
      </div>

      <button
        className={styles.startButton}
        onClick={handleStartRosco}
        type="button"
      >
        COMENZAR
      </button>
    </div>
  );
};

export default RoscoLanding;
