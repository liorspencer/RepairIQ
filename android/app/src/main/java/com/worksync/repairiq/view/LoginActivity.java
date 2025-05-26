package com.worksync.repairiq.view;

import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.widget.Button;
import android.widget.CheckBox;
import android.widget.EditText;
import android.widget.Toast;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;

import com.worksync.repairiq.R;

public class LoginActivity extends AppCompatActivity {

    private Button bEntrar;

    private EditText editUsuario, editSenha;
    private CheckBox checkBoxLogado;
    private SharedPreferences preferences;
    private static final String PREF_NAME = "LoginPrefs";


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.activity_login);

        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main), (v, insets) -> {
            Insets systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars());
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom);
            return insets;
        });

        preferences = getSharedPreferences(PREF_NAME, MODE_PRIVATE);
        boolean isLogged = preferences.getBoolean("logado", false);

        if (isLogged) {
            startActivity(new Intent(this, MenuPrincipalActivity.class));
            finish();
        }

        editUsuario = findViewById(R.id.editTextUsuario);
        editSenha = findViewById(R.id.editTextTextPassword);
        checkBoxLogado = findViewById(R.id.checkBoxLogado);
        bEntrar = findViewById(R.id.b_entrar);

        bEntrar.setOnClickListener(v -> {
            String usuario = editUsuario.getText().toString().trim();
            String senha = editSenha.getText().toString().trim();

            if (usuario.equals("admin") && senha.equals("1234")) {
                if (checkBoxLogado.isChecked()) {
                    SharedPreferences.Editor editor = preferences.edit();
                    editor.putBoolean("logado", true);
                    editor.apply();
                }

                Intent intent = new Intent(this, MenuPrincipalActivity.class);
                startActivity(intent);
                finish();
            } else {
                Toast.makeText(this, "Usuário ou senha inválidos", Toast.LENGTH_SHORT).show();
            }

        });
    }

}