package com.worksync.repairiq.view;

import android.content.Intent;
import android.os.Bundle;
import android.widget.Button;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;

import com.worksync.repairiq.R;

public class MenuPrincipalActivity extends AppCompatActivity {
    private Button bAbrirOcorrencia;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.activity_tela_principal);
        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main), (v, insets) -> {
            Insets systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars());
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom);
            return insets;
        });
        bAbrirOcorrencia = findViewById(R.id.b_abrir_ocorrencia_menu);
        bAbrirOcorrencia.setOnClickListener(v -> {
            Intent intent = new Intent(this, AbrirOcorrenciaActivity.class);
            startActivity(intent);
        });
    }
}