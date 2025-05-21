package com.worksync.repairiq.adapter;

import android.content.Context;
import android.net.Uri;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageButton;
import android.widget.ImageView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.worksync.repairiq.R;

import java.util.List;

public class OcorrenciaAdapter extends RecyclerView.Adapter<OcorrenciaAdapter.FotoViewHolder> {

    private Context context;
    private List<Uri> fotos; // Lista de URIs de fotos
    private OnRemoveClickListener onRemoveClickListener;

    // Interface para o evento de remover foto
    public interface OnRemoveClickListener {
        void onRemoveClick(Uri uri);
    }

    public OcorrenciaAdapter(Context context, List<Uri> fotos, OnRemoveClickListener onRemoveClickListener) {
        this.context = context;
        this.fotos = fotos;
        this.onRemoveClickListener = onRemoveClickListener;
    }

    // ViewHolder para os itens
    public static class FotoViewHolder extends RecyclerView.ViewHolder {
        ImageView imagePhoto;
        ImageButton btnRemove;

        public FotoViewHolder(View itemView) {
            super(itemView);
            imagePhoto = itemView.findViewById(R.id.image_photo);
            btnRemove = itemView.findViewById(R.id.btn_remove);
        }
    }

    @NonNull
    @Override
    public OcorrenciaAdapter.FotoViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        // Infla o layout do item (miniatura)
        View view = LayoutInflater.from(context).inflate(R.layout.item_photo, parent, false);
        return new FotoViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull OcorrenciaAdapter.FotoViewHolder holder, int position) {
        Uri fotoUri = fotos.get(position);
        holder.imagePhoto.setImageURI(fotoUri); // Exibe a imagem

        // Ação para remover a foto quando o botão de remover for clicado
        holder.btnRemove.setOnClickListener(v -> {
            onRemoveClickListener.onRemoveClick(fotoUri);
        });
    }

    @Override
    public int getItemCount() {
        return fotos.size(); // Retorna a quantidade de fotos
    }
}
