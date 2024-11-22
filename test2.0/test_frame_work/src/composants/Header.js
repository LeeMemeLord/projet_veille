import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Header = () => {
    const navigate = useNavigate();

    const [selectedPhaserOption, setSelectedPhaserOption] = useState("");
    const [selectedGsapOption, setSelectedGsapOption] = useState("");

    const handlePhaserSelectChange = (event) => {
        const value = event.target.value;
        setSelectedPhaserOption(value);
        if (value) {
            navigate(value);
        }

        setSelectedGsapOption("");
    };

    const handleGsapSelectChange = (event) => {
        const value = event.target.value;
        setSelectedGsapOption(value);
        if (value) {
            navigate(value);
        }

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
                    <option value="/phaser_game">Test Animation</option>
                    <option value="/phaser_menu_test">Test Menu</option>
                    <option value="/phaser_audio_test">Test Audio</option>
                </select>
                <select
                    value={selectedGsapOption}
                    onChange={handleGsapSelectChange}
                    style={styles.dropdown}
                    className={"mx-5"}
                >
                    <option value="" disabled>Selectionner test Three.js</option>
                    <option value="/test_sprite_three">Test sprite/images</option>
                    <option value="/three_canvas">Test Animation</option>
                    <option value="/three_menu_test">Test Menu Three</option>
                    <option value="/three_auido_test">Test Audio</option>
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
