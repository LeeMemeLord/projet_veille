import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Header = () => {
    const navigate = useNavigate(); // Hook pour la navigation

    // États pour chaque option sélectionnée
    const [selectedPhaserOption, setSelectedPhaserOption] = useState("");
    const [selectedGsapOption, setSelectedGsapOption] = useState("");

    // Fonction pour gérer le changement d'option pour Phaser
    const handlePhaserSelectChange = (event) => {
        const value = event.target.value;
        setSelectedPhaserOption(value); // Met à jour l'état de Phaser
        if (value) {
            navigate(value); // Redirige vers la route sélectionnée
        }

        // Réinitialise l'autre select (GSAP)
        setSelectedGsapOption("");
    };

    // Fonction pour gérer le changement d'option pour GSAP
    const handleGsapSelectChange = (event) => {
        const value = event.target.value;
        setSelectedGsapOption(value); // Met à jour l'état de GSAP
        if (value) {
            navigate(value); // Redirige vers la route sélectionnée
        }

        // Réinitialise l'autre select (Phaser)
        setSelectedPhaserOption("");
    };

    return (
        <header style={styles.header}>
            <nav>
                <select
                    value={selectedPhaserOption}
                    onChange={handlePhaserSelectChange}
                    style={styles.dropdown}
                >
                    <option value="" disabled>Selectionner test Phaser</option>
                    <option value="/test_sprite_ph">Test sprite/images</option>
                    <option value="/phaser_game">Test 2</option>
                    <option value="/phaser_menu_test">Test Menu</option>
                    <option value="/three_canvas">Test 3</option>
                </select>
                <select
                    value={selectedGsapOption}
                    onChange={handleGsapSelectChange}
                    style={styles.dropdown}
                    className={"mx-5"}
                >
                    <option value="" disabled>Selectionner test Three.js</option>
                    <option value="/test_sprite_three">Test sprite/images</option>
                    <option value="/three_canvas">Test 2</option>
                    <option value="/three_menu_test">Test Menu Three</option>
                    <option value="/test_automatisation">Test 3</option>
                </select>
            </nav>
        </header>
    );
};

const styles = {
    header: {
        backgroundColor: '#333',
        padding: '10px 20px',
        color: 'white',
        textAlign: 'center',
    },
    dropdown: {
        backgroundColor: '#444',
        color: 'white',
        border: 'none',
        fontSize: '18px',
        padding: '10px',
        cursor: 'pointer',
    },
};

export default Header;
