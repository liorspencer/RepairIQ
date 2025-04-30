package com.worksync.repairiq.view;

import android.Manifest;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.provider.MediaStore;
import android.widget.ImageButton;
import android.widget.Toast;

import androidx.activity.EdgeToEdge;
import androidx.activity.result.ActivityResultLauncher;
import androidx.activity.result.contract.ActivityResultContracts;
import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.google.android.material.button.MaterialButton;
import com.worksync.repairiq.R;
import com.worksync.repairiq.adapter.FotoAdapter;

import java.util.ArrayList;
import java.util.List;

public class AbrirOcorrenciaActivity extends AppCompatActivity {

    private static final int PERMISSION_REQUEST_CODE = 100;

    private RecyclerView rvFotos;
    private FotoAdapter fotoAdapter;
    private ImageButton ibFechar;
    private MaterialButton mbAdicionarFoto, mbAbrirOcorrencia;
    private List<Uri> listaFotos = new ArrayList<>(); // Lista que vai armazenar o URI das fotos
    private ActivityResultLauncher<Intent> galleryLauncher;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.activity_abrir_ocorrencia);
        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main), (v, insets) -> {
            Insets systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars());
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom);
            return insets;
        });

        rvFotos = findViewById(R.id.rv_fotos);
        rvFotos.setLayoutManager(new LinearLayoutManager(this, LinearLayoutManager.HORIZONTAL, false));

        // Inicializando o Adapter
        fotoAdapter = new FotoAdapter(this, listaFotos, new FotoAdapter.OnRemoveClickListener() {
            @Override
            public void onRemoveClick(Uri uri) {
                // Removendo a foto da lista
                listaFotos.remove(uri);
                fotoAdapter.notifyDataSetChanged(); // Atualiza a lista
                checarLista();
                Toast.makeText(AbrirOcorrenciaActivity.this, "Foto removida", Toast.LENGTH_SHORT).show();
            }
        });

        rvFotos.setAdapter(fotoAdapter);
        // Inicializa o ActivityResultLauncher
        galleryLauncher = registerForActivityResult(
                new ActivityResultContracts.StartActivityForResult(),
                result -> {
                    if (result.getResultCode() == RESULT_OK && result.getData() != null) {
                        Uri selectedImageUri = result.getData().getData();
                        if (selectedImageUri != null) {
                            listaFotos.add(selectedImageUri);
                            checarLista();
                            fotoAdapter.notifyDataSetChanged();
                        }
                    }
                }
        );
        // Botão para adicionar foto (apenas como exemplo, você pode modificar)
        mbAdicionarFoto = findViewById(R.id.b_adicionar_fotos2);
        mbAdicionarFoto.setOnClickListener(v -> checarPermissao());

        mbAbrirOcorrencia =findViewById(R.id.b_abrir_os);
        mbAbrirOcorrencia.setOnClickListener(v -> finalizar());

        ibFechar = findViewById(R.id.ib_close);
        ibFechar.setOnClickListener(v -> finalizar());
    }
    private void finalizar() {
        this.finish();
    }
    private void checarPermissao() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
            // Android 13+ (API 33+)
            if (ContextCompat.checkSelfPermission(this, Manifest.permission.READ_MEDIA_IMAGES)
                    != PackageManager.PERMISSION_GRANTED) {
                ActivityCompat.requestPermissions(this,
                        new String[]{Manifest.permission.READ_MEDIA_IMAGES},
                        PERMISSION_REQUEST_CODE);
            } else {
                abrirGaleria();
            }
        } else {
            // Android 27 a 32
            if (ContextCompat.checkSelfPermission(this, Manifest.permission.READ_EXTERNAL_STORAGE)
                    != PackageManager.PERMISSION_GRANTED) {
                ActivityCompat.requestPermissions(this,
                        new String[]{Manifest.permission.READ_EXTERNAL_STORAGE},
                        PERMISSION_REQUEST_CODE);
            } else {
                abrirGaleria();
            }
        }
    }

    private void checarLista() {
        if (!listaFotos.isEmpty()){
            rvFotos.setVisibility(RecyclerView.VISIBLE);
        } else {
            rvFotos.setVisibility(RecyclerView.GONE);
        }
    }

    // Trata a resposta da permissão
    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);

        if (requestCode == PERMISSION_REQUEST_CODE) {
            if (grantResults.length > 0 && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                abrirGaleria();
            } else {
                Toast.makeText(this, "Permissão negada para acessar imagens", Toast.LENGTH_SHORT).show();
            }
        }
    }

    private void abrirGaleria() {

        Intent intent = new Intent(Intent.ACTION_PICK);
        intent.setDataAndType(MediaStore.Images.Media.EXTERNAL_CONTENT_URI, "image/*");
        galleryLauncher.launch(intent);
    }

}